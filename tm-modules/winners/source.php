<?php
class Winners extends System
{
    public $system;
    public $config;
    public $file;
    
	function __construct($params = array()) {
		$this->system = $params['system'];
        $this->file = _cfg('dir').'/template/mails/lol-winners.html';
        
        $rows = Db::fetchRows('SELECT * '.
			'FROM `tm_settings` '.
			'WHERE `setting` = "lol-current-number-euw" OR '.
            '`setting` = "lol-current-number-eune" '
		);
        
        foreach($rows as $v) {
            $this->config[$v->setting] = $v->value;
        }
        
        return $this;
	}

	public function send($form) {
        $rows = Db::fetchRows(
            'SELECT `name`, `place`, `server`, `email` '.
            'FROM `participants` '.
            'WHERE `game` = "lol" AND '.
            '`server` = "'.Db::escape($form['server']).'" AND '.
            '`tournament_id` = "'.Db::escape($this->config['lol-current-number-'.$form['server']]).'" AND '.
            '`place` >= 1 AND `place` <= 4 '.
            'ORDER BY `place` ASC '.
            'LIMIT 4'
        );
        
        if (!$rows) {
			$this->system->log('Sending email to winners <b>No emails to send</b>', array('module'=>get_class(), 'type'=>'send'));
			return '0;No emails to send';
		}
        
        if (!file_exists($this->file)) {
            $this->system->log('Sending email to winners <b>File does not exist</b>', array('module'=>get_class(), 'type'=>'send'));
			return '0;File does not exist';
        }
        
        $emailText = file_get_contents($this->file);
        
        $places = array(1 => 'first', 2 => 'second', 3 => 'third', 4 => 'fourth');
        $placesNum = array(1 => '1st', 2 => '2nd', 3 => '3rd', 4 => '4th');
        $prizes = array(
            1 => '1600 RP + Triumphant Ryze skin + 4-Win IP boost', 
            2 => '1200 RP + 4win IP boost', 
            3 => '800 RP + 4win IP boost', 
            4 => '400 RP + 4win IP boost'
        );
        $i = 1;
        foreach($rows as &$v) {
            if ($v->place == $i) {
                $v->prizes = $prizes[$i];
                $v->playersList = nl2br($form[$places[$i].'_place']);
                $v->placesNum = $placesNum[$i];
            }
            ++$i;
        }
        unset($v);
        
        foreach($rows as $v) {
            $additionalPrice = '';
        
            /*if ($form['server'] == 'euw' && $v->place == 1) {
                $additionalPrice = '<br />'.
                'There is additional prize that you must receive for winning the 1st place, it is 30€ that will be sent to your paypal account.<br />'.
                'We consider email as the only reliable resource on which your team was registered, in this case it is '.$v->email.'.'.
                'So we ask you to respond from it and write down paypal account where should we send your prize money.'.
                '<br />';
            }*/
        
            $text = str_replace(
    			array(
                    '%name%',
                    '%place%',
                    '%prize%',
                    '%server%',
                    '%playerList%',
                    '%additionalPrice%',
                ),
    			array(
                    $v->name,
                    $v->placesNum,
                    $v->prizes,
                    strtoupper($v->server),
                    $v->playersList,
                    $additionalPrice,
                ),
    			$emailText
    		);
            
            $title = 'Pentaclick LoL tournament '.strtoupper($v->server).' #'.$this->config['lol-current-number-'.$form['server']].' - '.$v->placesNum.' place';
            
            $this->sendMail($v->email, $title, $text);
        }

		$this->system->log('<b>Emails sent to winners</b>', array('module'=>get_class(), 'type'=>'send'));
							 
        return '1;Emails sent to winners';
	}
}