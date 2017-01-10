<div class="legacy-tournament leagueoflegends">
    <div class="block">
        <div class="block-header-wrapper">
            <h1>League of Legends <?=$this->server?> <?=t('tournament_list')?></h1>
        </div>
        
		<? foreach($this->tournamentData as $v) { ?>
        <a class="block-content tournament-list <?=(strtolower($v['status'])=='ended'?'ended-tournament':'active-tournament')?>" href="<?=_cfg('href')?>leagueoflegends/<?=$this->server?>/<?=$v['name']?>">
            <div class="left-part">
                <div class="title"><?=t('tournament')?> #<?=$v['name']?></div>
                <div class="participant_count"><?=(isset($v['teamsCount'])?$v['teamsCount']:0)?> <?=t('of')?> <span class="<?=($v['teamsCount']>=$v['max_num']?'red':null)?>"><?=$v['max_num']?></span> <?=t('participants')?></div>
            </div>
            
            <div class="right-part">
                <div class="status"><?=$v['status']?></div>
                <div class="event-date"><?=t('event_date')?>: <?=$v['dates_start']?></div>
                <div class="event-date"><?=t('prize_pool')?>: <?=$v['prize']?></div>
            </div>
        </a>
        <? } ?>
    </div>
    
    <div class="block">
        <a name="rules"></a>
        <div class="block-header-wrapper">
            <h1><?=t('tournament_rules')?></h1>
        </div>

        <div class="block-content tournament-rules">
			<?=t('lol_tournament_rules')?>
        </div>
    </div>
</div>