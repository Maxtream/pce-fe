<?php
if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {
	exit();
}

require_once $_SERVER['DOCUMENT_ROOT'].'/wp-config.php';

$controller = $_POST['control'];
$action = $_POST['action'];
$post = array();
$err = array();
parse_str($_POST['post'], $post);
foreach($post as $k => $v) {
    $post[$k] = trim($v);
}

if ($controller == 'registerTeam') {
    if (!$post['team']) {
        $err['team'] = '0;'._p('field_empty', 'pentaclick');
    }    
    else if (strlen($post['team']) < 4) {
        $err['team'] = '0;'._p('team_name_small', 'pentaclick');
    }
    else if (strlen($post['team']) > 60) {
        $err['team'] = '0;'._p('team_name_big', 'pentaclick');
    }
    else {
        $suc['team'] = '1;'._p('approved', 'pentaclick');
    }
    
    if (!$post['email']) {
        $err['email'] = '0;'._p('field_empty', 'pentaclick');
    }    
    else if(!filter_var($post['email'], FILTER_VALIDATE_EMAIL)) {
        $err['email'] = '0;'._p('email_invalid', 'pentaclick');
    }
    else {
        $suc['email'] = '1;'._p('approved', 'pentaclick');
    }
    
    if (!$post['contact']) {
        $err['contact'] = '0;'._p('field_empty', 'pentaclick');
    }
    else if($post['contact']) {
        $suc['contact'] = '1;'._p('approved', 'pentaclick');
    }
    
    $players = array();
    $checkForSame = array();
    for($i=1;$i<=7;++$i) {
        if (!$post['mem'.$i] && $i < 6) {
            $err['mem'.$i] = '0;'._p('field_empty', 'pentaclick');    
        }
        else if ($post['mem'.$i]) {
            $response = runAPI('/euw/v1.3/summoner/by-name/'.rawurlencode(htmlspecialchars($post['mem'.$i])));
            $q = mysql_query(
        		'SELECT * FROM `players` WHERE '.
        		' `tournament_id` = 1 AND '.
        		' `name` = "'.mysql_real_escape_string($post['mem'.$i]).'" AND '.
        		' `game` = "lol" AND '.
                ' `approved` = 1 AND '.
                ' `deleted` = 0'
            );
            if (!$response) {
                $err['mem'.$i] = '0;'._p('summoner_not_found_euw', 'pentaclick');
            }
            else if ($response && $response->summonerLevel != 30) {
                $err['mem'.$i] = '0;'._p('summoner_low_lvl', 'pentaclick');
            }
            else if (in_array($post['mem'.$i], $checkForSame)) {
                $err['mem'.$i] = '0;'._p('same_summoner', 'pentaclick');
            }
            else if (mysql_num_rows($q) != 0) {
                $err['mem'.$i] = '0;'._p('summoner_already_registered', 'pentaclick');
            }
            else {
                $players[$i]['id'] = $response->id;
                $players[$i]['name'] = $response->name;
                $suc['mem'.$i] = '1;'._p('approved', 'pentaclick');
            }
            
            $checkForSame[] = $post['mem'.$i];
        }
    }
    
    if ($err) {
        $answer['ok'] = 0;
        if ($suc) {
            $err = array_merge($err, $suc);
        }
        $answer['err'] = $err;
    }
    else {
        $answer['ok'] = 1;
        $answer['err'] = $suc;
        
        $code = substr(sha1(time().rand(0,9999).$post['team']), 0, 32);
        mysql_query(
    		'INSERT INTO `teams` SET '.
            ' `game` = "lol", '.
            ' `tournament_id` = 1, '.
            ' `timestamp` = NOW(), '.
    		' `name` = "'.mysql_real_escape_string($post['team']).'", '.
            ' `email` = "'.mysql_real_escape_string($post['email']).'", '.
            ' `contact_info` = "'.mysql_real_escape_string($post['contact']).'", '.
            ' `link` = "'.$code.'", '.
            ' `ip` = "'.mysql_real_escape_string($_SERVER['REMOTE_ADDR']).'", '.
    		' `cpt_player_id` = "'.(int)$players[1]['id'].'"'
        );
        
        $teamId = sql_last_id();
        
        foreach($players as $k => $v) {
            mysql_query(
        		'INSERT INTO `players` SET '.
                ' `game` = "lol", '.
                ' `tournament_id` = 1, '.
                ' `team_id` = '.(int)$teamId.', '.
        		' `name` = "'.mysql_real_escape_string($v['name']).'", '.
                ' `player_num` = "'.(int)$k.'", '.
                ' `player_id` = "'.(int)$v['id'].'"'
            );
        }
        
        $text = getMailTemplate('reg-lol-team');
        
        $text = str_replace(
            array('%name%', '%team%', '%teamId%', '%code%', '%url%'),
            array($players[1]['name'], $post['team'], $teamId, $code, get_site_url()),
            $text
        );
        
        sendMail($post['email'], 'PentaClick eSports tournament participation', $text);
    }
}
else if ($controller == 'registerInHS') {
    $q = mysql_query(
		'SELECT * FROM `players` WHERE '.
		' `tournament_id` = '.(int)cOptions('tournament-hs-number').' AND '.
		' `name` = "'.mysql_real_escape_string($post['battletag']).'" AND '.
		' `game` = "hs" AND '.
        ' `approved` = 1 AND '.
        ' `deleted` = 0'
    );
    
    $battleTagBreakdown = explode('#', $post['battletag']);
    
    if (!$post['battletag']) {
        $err['battletag'] = '0;'._p('field_empty', 'pentaclick');
    }
    else if (mysql_num_rows($q) != 0) {
        $err['battletag'] = '0;'._p('player_already_registered', 'pentaclick');
    }
    else if (!$battleTagBreakdown[1] || !is_numeric($battleTagBreakdown[1])) {
        $err['battletag'] = '0;'._p('battle_tag_incorrect_must_be_like', 'pentaclick').' YourName#1234';
    }
    else {
        $suc['battletag'] = '1;'._p('approved', 'pentaclick');
    }
    
    if (!$post['email']) {
        $err['email'] = '0;'._p('field_empty', 'pentaclick');
    }    
    else if(!filter_var($post['email'], FILTER_VALIDATE_EMAIL)) {
        $err['email'] = '0;'._p('email_invalid', 'pentaclick');
    }
    else {
        $suc['email'] = '1;'._p('approved', 'pentaclick');
    }
    
    if ($err) {
        $answer['ok'] = 0;
        if ($suc) {
            $err = array_merge($err, $suc);
        }
        $answer['err'] = $err;
    }
    else {
        $answer['ok'] = 1;
        $answer['err'] = $suc;
        
        $code = substr(sha1(time().rand(0,9999)).$post['battletag'], 0, 32);
        mysql_query(
    		'INSERT INTO `teams` SET '.
            ' `game` = "hs", '.
            ' `tournament_id` = '.(int)cOptions('tournament-hs-number').', '.
            ' `timestamp` = NOW(), '.
            ' `ip` = "'.mysql_real_escape_string($_SERVER['REMOTE_ADDR']).'", '.
    		' `name` = "'.mysql_real_escape_string($post['battletag']).'", '.
            ' `email` = "'.mysql_real_escape_string($post['email']).'", '.
            ' `contact_info` = "'.mysql_real_escape_string($battleTagBreakdown[0]).'", '.
            ' `link` = "'.$code.'"'
        );
        
        $teamId = sql_last_id();
        
        mysql_query(
    		'INSERT INTO `players` SET '.
            ' `game` = "hs", '.
            ' `tournament_id` = '.(int)cOptions('tournament-hs-number').', '.
            ' `team_id` = '.(int)$teamId.', '.
    		' `name` = "'.mysql_real_escape_string($post['battletag']).'", '.
            ' `player_num` = 1'
        );
        
        $text = getMailTemplate('reg-hs-player');
        
        $text = str_replace(
            array('%name%', '%teamId%', '%code%', '%url%'),
            array($post['battletag'], $teamId, $code, HSURL),
            $text
        );
        
        sendMail($post['email'], 'PentaClick eSports Hearthstone tournament participation', $text);
    }
}
else if ($controller == 'statusCheck') {
    $q = mysql_query('SELECT `t`.`challonge_id`, `hsf`.`player1_id`, `hsf`.`player2_id`, `hsf`.`done`
    FROM `teams` AS `t`
    LEFT JOIN `hs_fights` AS `hsf` ON (`t`.`challonge_id` = `hsf`.`player1_id` OR `t`.`challonge_id` = `hsf`.`player2_id`)
    WHERE
    `t`.`id` = '.(int)$post['tId'].' AND
    `t`.`link` = "'.mysql_real_escape_string($post['code']).'" AND
    `t`.`deleted` = 0
    ');
    if (mysql_num_rows($q) == 0) {
        $answer['ok'] = 0;
    }
    else {
        $r = mysql_fetch_object($q);
        
        mysql_query('UPDATE `teams` SET `online` = '.time().' WHERE `id` = '.(int)$post['tId']);
        
        $answer['ok'] = 1;
        
        if ((isset($r->player1_id) || isset($r->player2_id)) && $r->done != 1) {
            $q = mysql_query(
            	'SELECT `name`, `online` '.
                'FROM `teams` '.
                'WHERE '.
                '`challonge_id` = '.(int)($r->challonge_id==$r->player1_id?$r->player2_id:$r->player1_id).' AND '.
                '`deleted` = 0'
            );
            if (mysql_num_rows($q)) {
                $enemy = mysql_fetch_object($q);
            }
            
            $answer['opponentName'] = $enemy->name;
            $answer['opponentStatus'] = onlineStatus($enemy->online);
        }
        else {
            $answer['opponentName'] = 'none';
            $answer['opponentStatus'] = false;
        }
    }
}
else if ($controller == 'chat') {
    $q = mysql_query('SELECT `challonge_id` FROM `teams` WHERE
    `id` = '.(int)$post['tId'].' AND
    `link` = "'.mysql_real_escape_string($post['code']).'" AND
    `deleted` = 0
    ');
    if (mysql_num_rows($q) == 0) {
        $answer['ok'] = 0;
        $answer['html'] = '<p id="notice">'.$post['text'].'</p><p>'._p('chat_disabled', 'pentaclick').'</p>';
    }
    else {
        $r = mysql_fetch_object($q);
        $q = mysql_query('SELECT `f`.`player1_id`, `f`.`player2_id`, `t1`.`id` AS `id1`, `t1`.`name` AS `name1`, `t2`.`id` AS `id2`, `t2`.`name` AS `name2`
        FROM `hs_fights` AS `f`
        LEFT JOIN `teams` AS `t1` ON `f`.`player1_id` = `t1`.`challonge_id`
        LEFT JOIN `teams` AS `t2` ON `f`.`player2_id` = `t2`.`challonge_id`
        WHERE
        `f`.`player1_id` = '.$r->challonge_id.' OR
        `f`.`player2_id` = '.$r->challonge_id.' AND
        `f`.`done` = 0
        ');
        if (mysql_num_rows($q)) {
            $players = mysql_fetch_object($q);
            
            $fileName = $_SERVER['DOCUMENT_ROOT'].'/chats/'.$players->id1.'_vs_'.$players->id2.'.txt';
            
            $file = fopen($fileName, 'a');
            if ($action == 'send') {
                $content = '<p><span id="notice">('.date('H:i:s', time()).')</span> &#60;'.($post['tId']==$players->id1?$players->name1:$players->name2).'&#62; - '.$post['text'].'</p>';
                fwrite($file, htmlspecialchars($content));
            }
            fclose($file);
            
            $chat = html_entity_decode(file_get_contents($fileName));
            
            $answer['ok'] = 1;
            $answer['html'] = $chat;
        }
        else {
            $answer['ok'] = 2;
        }            
    }
}
else if ($controller == 'leave') {
    if (!$post['tId'] || !$post['code']) {
        $answer['ok'] = 0;
        $answer['message'] = 'Data incorrect';
    }
    else {
        $q = mysql_query(
        	'SELECT `id`, `name`, `challonge_id`, `game` FROM `teams` WHERE'.
            ' `id` = '.(int)$post['tId'].' AND'.
            ' `link` = "'.mysql_real_escape_string($post['code']).'" AND'.
            ' `approved` = 1 AND'.
            ' `deleted` = 0'
        );

        if (mysql_num_rows($q) != 0) {
            mysql_query('UPDATE `teams` SET `deleted` = 1 WHERE `id` = '.(int)$post['tId']);
            mysql_query('UPDATE `players` SET `deleted` = 1 WHERE `team_id` = '.(int)$post['tId']);
            $r = mysql_fetch_object($q);
            
            $apiArray = array(
                '_method' => 'delete',
            );
            runChallongeAPI('tournaments/pentaclick-'.cOptions('brackets-link-'.$r->game).'/participants/'.$r->challonge_id.'.post', $apiArray);
            
            sendMail('pentaclickesports@gmail.com',
            ($r->game=='hs'?'Player':'Team').' deleted. PentaClick eSports.',
            'Participant was deleted!!!<br />
            Date: '.date('d/m/Y H:i:s').'<br />'.
            ($r->game=='hs'?'BattleTag':'TeamName').': <b>'.$r->name.'</b><br>
            IP: '.$_SERVER['REMOTE_ADDR']);
            
            $answer['ok'] = 1;
            $answer['message'] = _p('good_luck', 'pentaclick');
        }
        else {
            $answer['ok'] = 0;
            $answer['message'] = 'SQL Data incorrect';
        }
    }
}
else {
    $answer['ok'] = 0;
    $answer['err'] = 'Control not found';
}

echo json_encode($answer);