<h1>Emails to winners</h1>

<table class="table emails" id="send" name="emails">
    <tr>
        <td width="20%"><b>Email template</b></td>
        <td>
            <select id="template" class="chosen" style="min-width: 250px">
                <? foreach($module->templates as $k => $v) { ?>
                <option value="<?=$v?>"><?=$k?></option>
                <? } ?>
            </select>
        </td>
    </tr>
    <tr>
        <td width="20%"><b>Email title</b></td>
        <td><input type="text" id="title" size="50" value="Pentaclick tournament invitation!" /></td>
    </tr>
    <tr>
        <td class="b">Query</td>
        <td>
            <textarea id="query" class="noEditor" style="width: 98%; resize: vertical; height: 120px;"><?=$module->query?></textarea>
            <br />
            Themes = "all", "lol", "hs"
        </td>
    </tr>
    <tr>
        <td class="b">Email <?=at('text')?></td>
        <td>
            <textarea id="text" class="noEditor" style="width: 98%; resize: vertical; height: 250px;"></textarea>
            <br />
            %unsublink% = _cfg('href').'unsubscribe/'.$v->unsublink<br />
            %url% = _cfg('site')<br />
            %hsurl% = _cfg('site').'/en/hearthstone'<br />
            %lolurl% = _cfg('site').'/en/leagueoflegends<br />
            %code% = $v->code (`link` in team table)<br />
            %teamId% = $v->teamId<br />
            %name% = $v->name
        </td>
    </tr>
    <tr><td colspan="2"><button class="submitButton">Send</button></td></tr>
</table>

<script>
function updateText() {
    var query = {
        type: 'POST',
        timeout: 10000,
        data: {
            control: 'submitForm',
            module: 'emails',
            action: 'fetchTemplateText',
            form: $('#template').val()
        },
        success: function(answer) {
            data = answer.split(';');
            if (data[0] != 0) {
                $('#text').val(answer.substr(2));
                return false;
            }
            alert('Error: '+data[1]);

        }
    };
    ajax(query);
}

$('#template').on('change', function() {
    updateText();
});

updateText();
</script>