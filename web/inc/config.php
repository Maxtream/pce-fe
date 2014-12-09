<?php
$cfg['href'] = $cfg['site'].'/%lang%';
$cfg['hssite'] = '/hearthstone';
$cfg['lolsite'] = '/league';

$cfg['inc'] = $cfg['dir'].'/inc';
$cfg['classes'] = $cfg['dir'].'/classes';
$cfg['template'] = $cfg['dir'].'/template';
$cfg['template'] = $cfg['dir'].'/template';
$cfg['static'] = $cfg['site'].'/web/static';
$cfg['img'] = $cfg['static'].'/images';
$cfg['uploads'] = $cfg['dir'].'/uploads';
$cfg['imgu'] = $cfg['site'].'/web/uploads';
$cfg['avatars'] = $cfg['img'].'/avatar';

$cfg['timeDifference'] = 0; //in minutes (+3h)

/** social logins */
$cfg['social'] = array(
	//client_id, client_secure
    'fb'    => array('id' => '766575306708443', 'private' => '1cbf6970d0073b4490d97653afcb5ffc'), //facebook
    'tw'    => array('id' => 'eOgJnO2SkfjkBFwLZ9lrWSyrL', 'private' => 'dxgLUmgeoBb6AfBaaADLHykhQOb71sdyZcHoJLRZkuupWfzT2B'), //twitter
	'vk'    => array('id' => '4445595', 'private' => 'QctUnxnf6QqfcMbuTWas'), //vkontakte
	'gp'    => array('id' => '974420857967-p2jrt83osg4op0u3k9k22um06omqafpa.apps.googleusercontent.com', 'private'=>'bnBaBT6zB1CobY4MGXpwfOin'),
    'tc'    => array('id' => 'ew4ocriuxjr7b9c7najq3588f30gd63', 'private'=>'94nsyz930bomq4nf8f8a6ppvrpz8n2h'), //twitch
    'bn'    => array('id' => 'gv3s76c5mk8brmhwkg7q7qagt7w3ds48', 'private'=>'j5WkZNXDkSY6eVNyGtgzyfEVs2MTasJN'),
);

$cfg['streamGames'] = array(
    'lol'   => 'league_of_legends',
    'hs'    => 'hearthstone',
    'dota'  => 'dota',
    'smite' => 'smite',
    'cs'    => 'csgo',
    'other' => 'random',
);
$cfg['streamLanguages'] = array(
    'en'    => 'English',
    'ru'    => 'Русский',
    'both'  => 'both',
);
$cfg['lolRegions'] = array(
    'euw' => 'Europe West',
    'eune' => 'Europe Nordic & East',
    'tr' => 'Turkey',
    'ru' => 'Russia',
    'na' => 'North America',
    'lan' => 'Latin America North',
    'las' => 'Latin America South',
    'kr' => 'Korea',
    'br' => 'Brazil',
    'oce' => 'Oceania',
);
