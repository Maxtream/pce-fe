<?php

class streams extends System
{
	public $streams;
    public $stream;
    public $pickedStream = 0;
	
	public function __construct($params = array()) {
		parent::__construct();
	}
	
	public function getStreamList() {
        $this->streams = Db::fetchRows(
            'SELECT `id`, `name`, `display_name`, `featured`, `game`, `viewers`, IF(`online` >= '.(time()-360).', 1, 0) AS `onlineStatus` '.
            'FROM `streams` '.
            'WHERE `online` != 0 AND '.
            '`approved` = 1 AND '.
            '(`languages` = "'.Db::escape(_cfg('language')).'" OR `languages` = "both") '.
            'ORDER BY `onlineStatus` DESC, `featured` DESC, `viewers` DESC '
		);
        
        if (isset($_GET['val2']) && $_GET['val2']) {
            $this->pickedStream = (int)$_GET['val2'];
        }
        
		include_once _cfg('pages').'/'.get_class().'/index.tpl';
	}
	
	public function getStream() {
		$this->stream = Db::fetchRows('SELECT `id`, `name`, `display_name`, `featured`, `game`, `viewers` FROM `streams` '.
            'WHERE `id` = '.(int)$_GET['val2'].' '.
            'LIMIT 1'
		);
		
		include_once _cfg('pages').'/'.get_class().'/stream.tpl';
	}
	
	public function showTemplate() {
		/*if (isset($_GET['val1']) && $_GET['val1'] == 'stream') {
			$this->getStream();
		}
		else {*/
			$this->getStreamList();
		//}
	}
}