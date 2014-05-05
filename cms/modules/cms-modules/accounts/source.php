<?php

class Accounts
{
	public $system;
	public $accounts = array();

	function __construct($params = array()) {
		$this->system = $params['system'];

		if (isset($params['var1']) && $params['var1'] == 'edit' && isset($params['var2'])) {
			$this->editData = $this->fetchEditData($params['var2']);
		}
		
		if (isset($params['var1']) && $params['var1'] == 'delete' && isset($params['var2'])) {
			$this->deleteRow($params['var2']);
			//redirect
			go(_cfg('cmssite').'/#accounts');
		}
		
		$this->accounts = Db::fetchRows('SELECT * FROM `tm_admins`');

		return $this;
	}

	public function add($form) {
		if (!$form['login']) {
			$this->system->log('Adding new admin <b>'.at('admin_err').'</b> ('.$form['login'].')', array('module'=>get_class(), 'type'=>'add'));
			return '0;'.at('admin_err');
		}
		else if (strpos($form['login'], ' ')) {
			$this->system->log('Adding new admin <b>'.at('title_have_spaces').'</b> ('.$form['login'].')', array('module'=>get_class(), 'type'=>'add'));
			return '0;'.at('title_have_spaces');
		}
		else if ($form['email'] && !filter_var($form['email'], FILTER_VALIDATE_EMAIL)) {
			$this->system->log('Adding new admin <b>'.at('email_incorrect').'</b>', array('module'=>get_class(), 'type'=>'add'));
			return '0;'.at('email_incorrect');
		}
		else {
			$login = Db::escape($form['login']);
			$q = Db::query('SELECT * FROM `tm_admins` WHERE `login` = "'.$login.'" LIMIT 1');
			if ($q->num_rows != 0) {
				$this->system->log('Adding new admin <b>'.at('admin_exist').'</b> ('.$form['login'].')', array('module'=>get_class(), 'type'=>'add'));
				return '0;'.at('admin_exist');
			}
			else {
				Db::query('INSERT INTO `tm_admins` '.
					'SET `login` = "'.$login.'", '.
					'`password` = "'.sha1($form['password']._cfg('salt')).'", '.
					'`email` = "'.Db::escape($form['email']).'", '.
					'`level` = '.(int)$form['level']
				);
				
				$this->system->log('Adding new admin <b>'.at('new_admin_added').'</b> ('.$form['login'].')', array('module'=>get_class(), 'type'=>'add'));

				return '1;'.at('new_admin_added');
			}
		}

		return '0;Error, contact admin!';
	}

	public function edit($form) {
		if ($form['email'] && !filter_var($form['email'], FILTER_VALIDATE_EMAIL)) {
			$this->system->log('Editing admin error <b>'.at('email_incorrect').'</b>', array('module'=>get_class(), 'type'=>'edit'));
			return '0;'.at('email_incorrect');
		}
		else {
			$query = 'UPDATE `tm_admins` ';
			$query .= 'SET `email` = "'.Db::escape($form['email']).'"';
			if ($form['level'] <= $this->system->user->level) {
				$query .= ', `level` = '.(int)$form['level'].' ';
			}
			if ($form['password']) {
				$query .= ', `password` = "'.sha1($form['password']._cfg('salt')).'" ';
			}
			$query .= ' WHERE `id` = '.$form['admin_id'];
			
			Db::query($query);
							 
			$this->system->log('Editing admin <b>'.at('info_updated').'</b> ('.$form['login'].')', array('module'=>get_class(), 'type'=>'edit'));
							 
			return '1;'.at('info_updated');
		}

		return '0;Error, contact admin!';
	}
	
	protected function fetchEditData($id) {
		return Db::fetchRow('SELECT * '.
			'FROM `tm_admins` '.
			'WHERE `id` = "'.intval($id).'" '.
			'LIMIT 1'
		);
	}

	protected function deleteRow($id) {
		$row = Db::fetchRow('SELECT `login`, `level` FROM `tm_admins` WHERE `id` = "'.intval($id).'" LIMIT 1');
		
		if ($row->level >= $this->system->user->level) {
			$this->system->log('Deleting admin error, level low <b>'.$row->login.'</b> ('.$row->level.'-'.$this->system->user->level.')</b>', array('module'=>get_class(), 'type'=>'delete'));
		}
		else {
			Db::query('DELETE FROM `tm_admins` WHERE `id` = '.intval($id).' AND `level` < '.$this->system->user->level);
			$this->system->log('Deleting admin <b>'.$row->login.'</b>', array('module'=>get_class(), 'type'=>'delete'));
		}
	}
}