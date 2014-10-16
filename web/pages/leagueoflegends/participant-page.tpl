<section class="container page lol">

<div class="left-containers">
	<? if ($regged == 1) { ?>
		<p class="success-add"><?=t('participation_verified')?></p>
	<? } ?>
    
    <? if (!$this->logged_in) { ?>
        <p class="info-add"><?=t('participant_not_user')?></p>
    <? } else if ($_SESSION['participant']->user_id == 0) { ?>
        <p class="info-add"><?=t('participant_user_not_connected')?></p>
        <div class="connect-team">
            <div class="button" id="connectTeamToAccount"><?=t('connect_team_to_account')?></div>
        </div>
    <? } ?>
	
	<div class="block">
        <div class="block-header-wrapper">
            <h1 class="bordered"><?=t('information')?></h1>
        </div>
        
        <div class="block-content vods">
            <p><?=t('brackets')?>: <a href="http://pentaclick.challonge.com/lol<?=$this->server?><?=$this->data->settings['lol-current-number-'.$this->server]?>/" target="_blank">http://pentaclick.challonge.com/lol<?=$this->server?><?=$this->data->settings['lol-current-number-'.$this->server]?>/</a></p>
            <?=t('participant_information_txt')?>
        </div>
    </div>
</div>