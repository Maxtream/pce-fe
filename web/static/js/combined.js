$(".user-comments").on("click",".edit",function(){var a=$(this).closest(".actions").find(".edit-text");a.stop().slideToggle()}).on("click","#closeEditComment",function(){var a=$(this).closest(".actions").find(".edit-text");a.stop().slideUp()}).on("click",".delete",function(){return confirm($(this).attr("attr-msg"))&&PC.deleteBoardComment($(this)),!1}).on("click",".report",function(){return confirm($(this).attr("attr-msg")),!1}).on("click","#editComment",function(){PC.editComment($(this))}),$(".board").on("click",".delete",function(){var a=$(this).closest(".board"),b=a.attr("attr-id");return confirm($(this).attr("attr-msg"))&&PC.deleteBoard(b),!1}).on("click",".report",function(){{var a=$(this).closest(".board");a.attr("attr-id")}return confirm($(this).attr("attr-msg")),!1}),$(".confirm").on("click",function(){return confirm($(this).attr("attr-msg"))&&(location.href=$(this).attr("href")),!1}),$(".board .voting").on("click",".arrow",function(){if(0===g.logged_in)return PC.openPopup("login-window"),!1;var a=parseInt($(this).closest(".board").attr("attr-id"));$(this).hasClass("top")?PC.boardVote("plus",a):PC.boardVote("minus",a)}),$(".summoners").on("click",".notApproved .status",function(){var a=parseInt($(this).closest(".summoner").attr("attr-id")),b=$(this).closest(".summoner").attr("attr-masteries");$(".how_to_approve").slideUp("fast",function(){$(".how_to_approve").slideDown("slow"),$(".how_to_approve").find(".verification-code").val(b),$(".how_to_approve").find("#masteries-code").html(b),$(".how_to_approve").find("#summonerVerifyId").val(a)})}),$("#verifySummoner").on("click",function(){PC.verifySummoner($(this))}),$(".summoners").on("click",".removeSummoner",function(){PC.removeSummoner($(this).closest(".summoner"))}),$("#addSummoner").on("click",function(){PC.addSummoner()}),$("#checkInLol").on("click",function(){PC.checkIn()}),$(".submitBoard .categories").on("click","div",function(){$(".submitBoard .categories div").removeClass("active"),$(this).addClass("active"),$(".submitBoard #category").val($(this).attr("attr-category"))}),$(".submitBoard #submitBoard").on("click",function(){PC.submitBoard()}),$("#submitBoardComment").on("click",function(){PC.submitBoardComment()}),$(".avatars-list .avatar-block").on("click",function(){var a=$("#avatar").val();$(".avatars-list .avatar-block").removeClass("picked"),$(this).addClass("picked"),$("#avatar").val($(this).attr("attr-id"));var b=$(".nav-avatar a img").attr("src");b=b.replace(a+".jpg",$(this).attr("attr-id")+".jpg"),$(".nav-avatar a img").attr("src",b)}),$(".editStreamerAction .change_game, .editStreamerAction .change_languages").on("change",function(){PC.editStreamer(this)}),$(".editStreamerAction #removeStreamer").on("click",function(){PC.removeStreamer(this)}),$("#submitStreamer").on("click",function(){PC.submitStreamer()}),$("#connectTeamToAccount").on("click",function(){PC.connectTeamToAccount()}),$("div.streamer").on("click",function(){var a=$(this).attr("attr-id");$("#stream_"+a).stop().slideToggle("slow")}),$("#submitComment").on("click",function(){PC.comment()}),$(".formbut").on("click",function(){allowedFormat=["b","i","s","link","q","list"],element=$(this),$.each(allowedFormat,function(a,b){element.hasClass(b)&&PC.format[b]()})}),0===$(".ad-holder").height()&&$(".ad-blocked").show(),$(".login, .must-login").on("click",function(){PC.openPopup("login-window")}),$("#fader, #close-popup").on("click",function(){PC.closePopup()}),$(".socialLogin").on("click",function(){var a=$(this).attr("id");PC.social[a]()}),$(".socialConnect").on("click",function(){var a=$(this).attr("id");PC.social.connect(a)}),$(".socialDisconnect").on("click",function(){var a=$(this).attr("id");PC.social.disconnect(a)}),$("#updateProfile").on("click",function(){PC.updateProfile()}),$(".connected").on("mouseover",function(){$(this).text(g.str.disconnect)}).on("mouseout",function(){$(this).text(g.str.connected)}),$(".disconnected").on("mouseover",function(){$(this).text(g.str.connect)}).on("mouseout",function(){$(this).text(g.str.disconnected)}),$(".bx-wrapper").bxSlider({auto:!0,autoHover:!0,mode:"fade",speed:2e3,pause:4e3}),$(".languages a").on("click",function(){$(".languages .language-switcher").stop().slideToggle("fast")}),$(document).on("scroll",function(){0!==parseInt($(document).scrollTop())&&$("#toTop").is(":hidden")?$("#toTop").fadeIn("slow",function(){$("#toTop").css("transition",".3s")}):0===parseInt($(document).scrollTop())&&($("#toTop").css("transition","0"),$("#toTop").fadeOut("fast"))}),$("#toTop").on("click",function(){$("html, body").animate({scrollTop:0},500)}),$(".confirm").on("click",function(){return confirm($(this).attr("attr-msg"))&&(location.href=$(this).attr("href")),!1}),$(".participants.isotope-participants .block").length>0&&$(".participants.isotope-participants").isotope({itemSelector:".block",layoutMode:"fitRows"}),$(".participants.isotope-participants-pending .block").length>0&&$(".participants.isotope-participants-pending").isotope({itemSelector:".block",layoutMode:"fitRows"}),$(".participants").on("click",".block",function(a){$(a.target).is("a")||$(this).find(".player-list").slideToggle(500,function(){$(".participants.isotope-participants .block").length>0&&$(".participants.isotope-participants").isotope("reLayout"),$(".participants.isotope-participants-pending .block").length>0&&$(".participants.isotope-participants-pending").isotope("reLayout")})}),$(".like").on("click",function(){PC.like(this)}),$("#submitContactForm").on("click",function(){PC.submitContactForm(this)}),$(document).on("mousemove",".hint",function(a){return $("#hint-helper").offset({top:a.pageY-30,left:a.pageX+10}),$("#hint-helper").is(":visible")?!1:(msg=$(this).attr("attr-msg"),$("#hint-helper p").html!=msg&&$("#hint-helper p").html(msg),void($("#hint-helper").is(":hidden")&&$("#hint-helper").css("display","inline-block")))}).on("mouseout",".hint",function(){$("#hint-helper").offset({top:0,left:0}),$("#hint-helper").css("display","none")});var PC={site:g.site,formInProgress:0,deleteBoardComment:function(a){if(1==this.formInProgress)return!1;this.formInProgress=1;var b={type:"POST",data:{ajax:"submitBoard",module:"delete",type:"comment",id:parseInt(a.closest(".master").attr("attr-id"))},success:function(b){return PC.formInProgress=0,a.removeClass("alpha"),answer=b.split(";"),1==answer[0]&&(a.closest(".master").find(".body .edited").hide(),a.closest(".master").find(".actions").remove(),a.closest(".master").find(".body p").html(answer[1])),!1}};this.ajax(b)},deleteBoard:function(a){if(1==this.formInProgress)return!1;this.formInProgress=1;var b={type:"POST",data:{ajax:"submitBoard",module:"delete",type:"board",id:a},success:function(a){PC.formInProgress=0,answer=a.split(";"),1==answer[0]?$(".board .thread .text").length>0&&$(".board .thread .text").html(answer[1]):alert(answer[1])}};this.ajax(b)},boardVote:function(a,b){if(1==this.formInProgress)return!1;this.formInProgress=1;var c={type:"POST",data:{ajax:"boardVote",type:"board",status:a,id:b},success:function(c){PC.formInProgress=0,answer=c.split(";"),count=parseInt($("#board_vote_"+b).html()),3!=answer[0]&&($("#board_vote_"+b).parent().find(".arrow.top").removeClass("voted"),$("#board_vote_"+b).parent().find(".arrow.bottom").removeClass("voted")),1==answer[0]?"plus"==a?($("#board_vote_"+b).parent().find(".arrow.top").addClass("voted"),$("#board_vote_"+b).html(count+1)):($("#board_vote_"+b).parent().find(".arrow.bottom").addClass("voted"),$("#board_vote_"+b).html(count-1)):2==answer[0]&&$("#board_vote_"+b).html("plus"==a?count-1:count+1)}};this.ajax(c)},submitBoardComment:function(){if(1==this.formInProgress)return!1;this.formInProgress=1,$("#submitBoardComment").addClass("alpha"),$(".leave-comment #error").hide();var a={type:"POST",data:{ajax:"submitBoard",module:$(".leave-comment #module").val(),text:$(".leave-comment #msg").val(),id:$(".leave-comment #id").val()},success:function(a){return PC.formInProgress=0,$("#submitBoardComment").removeClass("alpha"),answer=a.split(";"),1==answer[0]?($(".leave-comment #msg").val(""),console.log(answer[1]),$(".user-comments").prepend(answer[1])):$(".leave-comment #error").html("<p>"+answer[1]+"</p>").slideDown("fast"),!1}};this.ajax(a)},submitBoard:function(){if(1==this.formInProgress)return!1;this.formInProgress=1,$("#submitBoard").addClass("alpha"),$(".submitBoard #error").hide();var a={type:"POST",data:{ajax:"submitBoard",module:$(".submitBoard #module").val(),title:$(".submitBoard #title").val(),text:$(".submitBoard #msg").val(),category:$(".submitBoard #category").val(),id:$(".submitBoard #boardId").val()},success:function(a){return PC.formInProgress=0,$("#submitBoard").removeClass("alpha"),answer=a.split(";"),1==answer[0]?window.location.replace(answer[1]):$(".submitBoard #error").html("<p>"+answer[1]+"</p>").slideDown("fast"),!1}};this.ajax(a)},verifySummoner:function(a){if(1==this.formInProgress)return!1;$(a).addClass("alpha"),$(".summoner-verification #error").slideUp("fast"),this.formInProgress=1;var b={type:"POST",data:{ajax:"verifySummoner",id:parseInt($("#summonerVerifyId").val())},success:function(b){return PC.formInProgress=0,$(a).removeClass("alpha"),answer=b.split(";"),1==answer[0]?($(".summoner-verification #error").slideUp("fast"),$(".how_to_approve").slideUp("slow",function(){$('.summoner[attr-id="'+answer[1]+'"]').removeClass("notApproved").addClass("approved"),$('.summoner[attr-id="'+answer[1]+'"] .status').removeClass("hint").html(g.str.approved)})):($(".summoner-verification #error p").html(answer[1]),$(".summoner-verification #error").slideDown("fast")),!1}};this.ajax(b)},removeSummoner:function(a){if(1==this.formInProgress)return!1;$(a).addClass("alpha"),$(".summoner-form #error").slideUp("fast"),this.formInProgress=1;var b={type:"POST",data:{ajax:"removeSummoner",id:parseInt(a.attr("attr-id"))},success:function(b){return PC.formInProgress=0,answer=b.split(";"),1==answer[0]?$(a).slideUp("slow",function(){$(this).remove(),$(".summoners .block-content.summoner").length<=1&&$(".summoners").append('<div class="block-content empty">none</div>')}):alert(answer[1]),!1}};this.ajax(b)},addSummoner:function(){if(1==this.formInProgress)return!1;$("#addSummoner").addClass("alpha"),$(".summoner-form #error").slideUp("fast"),this.formInProgress=1;var a={type:"POST",data:{ajax:"addSummoner",name:$(".summoner-form #name").val(),region:$(".summoner-form #region").val()},success:function(a){if(PC.formInProgress=0,$("#addSummoner").removeClass("alpha"),answer=a.split(";"),1==answer[0]){a=$.parseJSON(answer[1]);var b=$(".dumpSummoner").html();b=b.replace("%id%",a.id),b=b.replace("%masteries%",a.verificationCode),b=b.replace(/%name%/g,a.name),b=b.replace("%regionName%",a.regionName),b=b.replace("%region%",a.region),$(".summoners .block-content").hasClass("empty")&&$(".summoners .block-content").remove(),$(".summoners").append(b),$(".summoners").find(".summoner:hidden").slideDown("slow",function(){$(this).find(".status").trigger("click")})}else $(".summoner-form #error").html("<p>"+answer[1]+"</p>").slideDown("fast");return!1}};this.ajax(a)},checkIn:function(){if(1==this.formInProgress)return!1;$(this).addClass("alpha"),this.formInProgress=1;var a={type:"POST",data:{ajax:"checkInLOL"},success:function(a){return PC.formInProgress=0,$(this).removeClass("alpha"),answer=a.split(";"),1==answer[0]?$(".block.check-in").fadeOut():alert(answer[1]),!1}};this.ajax(a)},editStreamer:function(a){if(1==this.formInProgress)return!1;streamerId=$(a).closest(".streamer").attr("attr-id"),valueGame=$(a).closest(".editStreamerAction").find(".change_game").val(),valueLanguage=$(a).closest(".editStreamerAction").find(".change_languages").val(),this.formInProgress=1,$(a).closest(".streamer").addClass("alpha");var b={type:"POST",data:{ajax:"editStreamer",id:streamerId,game:valueGame,language:valueLanguage},success:function(b){return PC.formInProgress=0,$(a).closest(".streamer").removeClass("alpha"),answer=b.split(";"),1==answer[0]||alert(answer[1]),!1}};this.ajax(b)},removeStreamer:function(a){if(1==this.formInProgress)return!1;streamerId=$(a).closest(".streamer").attr("attr-id"),this.formInProgress=1,$(a).closest(".streamer").addClass("alpha");var b={type:"POST",data:{ajax:"removeStreamer",id:streamerId},success:function(b){return PC.formInProgress=0,$(a).closest(".streamer").removeClass("alpha"),answer=b.split(";"),1==answer[0]?$(a).closest(".streamer").remove():alert(answer[1]),!1}};this.ajax(b)},submitStreamer:function(){if(1==this.formInProgress)return!1;this.formInProgress=1,$("#submitStreamer").addClass("alpha"),$(".streamer-form #error").hide();var a={type:"POST",data:{ajax:"submitStreamer",form:$(".streamer-form").serialize()},success:function(a){return PC.formInProgress=0,$("#submitStreamer").removeClass("alpha"),answer=a.split(";"),1==answer[0]?($(".streamer-form").slideUp("fast"),$(".success-sent").slideDown("fast"),$(".success-sent p").html(answer[1])):$(".streamer-form #error").html("<p>"+answer[1]+"</p>").slideDown("fast"),!1}};this.ajax(a)},connectTeamToAccount:function(){if(1==this.formInProgress)return!1;this.formInProgress=1;var a={type:"POST",data:{ajax:"connectTeamToAccount"},success:function(a){return PC.formInProgress=0,answer=a.split(";"),1==answer[0]?($(".info-add").fadeOut(),$(".connect-team").fadeOut()):alert(answer[1]),!1}};this.ajax(a)},getNewsComments:function(a){var b={type:"POST",data:{ajax:"getNewsComments",id:parseInt(a)},success:function(a){$(".user-comments").html(a)}};this.ajax(b)},editComment:function(a){if(1==this.formInProgress)return!1;this.formInProgress=1,a.addClass("alpha"),a.closest(".master").find(".edit-text #error").hide();var b={type:"POST",data:{ajax:"comment",module:"editBoardComment",id:parseInt(a.closest(".master").attr("attr-id")),text:a.closest(".master").find(".edit-text textarea").val()},success:function(b){return PC.formInProgress=0,a.removeClass("alpha"),answer=b.split(";"),1==answer[0]?(a.closest(".master").find("#closeEditComment").trigger("click"),a.closest(".master").find(".body p").html(answer[1]),a.closest(".master").find(".body .edited").show()):(a.closest(".master").find(".edit-text #error p").html(answer[1]),a.closest(".master").find(".edit-text #error").slideDown()),!1}};this.ajax(b)},comment:function(){if(1==this.formInProgress)return!1;this.formInProgress=1,$("#submitComment").addClass("alpha"),$(".leave-comment #error").hide();var a={type:"POST",data:{ajax:"comment",module:$(".leave-comment #module").val(),id:parseInt($(".leave-comment #id").val()),text:$(".leave-comment #msg").val()},success:function(a){return PC.formInProgress=0,$("#submitComment").removeClass("alpha"),answer=a.split(";"),1==answer[0]?($(".leave-comment #msg").val(""),PC.getNewsComments($(".leave-comment #id").val()),$("#comments-count").length>0&&$("#comments-count").html(parseInt($("#comments-count").html())+1)):$(".leave-comment #error").html("<p>"+answer[1]+"</p>").slideDown("fast"),!1}};this.ajax(a)},format:{b:function(){var a=$("#msg").val().split(""),b=$("#msg")[0].selectionStart,c=$("#msg")[0].selectionEnd;c!=b?(a.splice(c,0,"**"),a.splice(b,0,"**"),returnText=a.join(""),$("#msg").val(returnText).focus(),$("#msg")[0].selectionStart=b,$("#msg")[0].selectionEnd=c+4):(a.splice(b,0,"****"),returnText=a.join(""),$("#msg").val(returnText).focus(),$("#msg")[0].selectionStart=b+2,$("#msg")[0].selectionEnd=b+2)},i:function(){var a=$("#msg").val().split(""),b=$("#msg")[0].selectionStart,c=$("#msg")[0].selectionEnd;c!=b?(a.splice(c,0,"*"),a.splice(b,0,"*"),returnText=a.join(""),$("#msg").val(returnText).focus(),$("#msg")[0].selectionStart=b,$("#msg")[0].selectionEnd=c+2):(a.splice(b,0,"**"),returnText=a.join(""),$("#msg").val(returnText).focus(),$("#msg")[0].selectionStart=b+1,$("#msg")[0].selectionEnd=b+1)},s:function(){var a=$("#msg").val().split(""),b=$("#msg")[0].selectionStart,c=$("#msg")[0].selectionEnd;c!=b?(a.splice(c,0,"~~"),a.splice(b,0,"~~"),returnText=a.join(""),$("#msg").val(returnText).focus(),$("#msg")[0].selectionStart=b,$("#msg")[0].selectionEnd=c+4):(a.splice(b,0,"~~~~"),returnText=a.join(""),$("#msg").val(returnText).focus(),$("#msg")[0].selectionStart=b+2,$("#msg")[0].selectionEnd=b+2)},link:function(){var a=prompt(g.str.enter_url);if(!a)return!1;"http://"!=a.substring(0,7)&&(a="http://"+a);var b=$("#msg").val().split(""),c=$("#msg")[0].selectionStart,d=$("#msg")[0].selectionEnd+1;d!=c?(b.splice(c,0,"["),b.splice(d,0,"]("+a+")"),returnText=b.join(""),$("#msg").val(returnText).focus(),$("#msg")[0].selectionStart=d+3+a.length,$("#msg")[0].selectionEnd=d+3+a.length):(b.splice($("#msg")[0].selectionStart,0,"[]("+a+")"),returnText=b.join(""),$("#msg").val(returnText).focus(),$("#msg")[0].selectionStart=c+1,$("#msg")[0].selectionEnd=c+1)},q:function(){var a=$("#msg").val().split(""),b=$("#msg")[0].selectionStart,c=$("#msg")[0].selectionEnd;c!=b?(a.splice(c,0,"[/q]"),a.splice(b,0,"[q]"),returnText=a.join(""),$("#msg").val(returnText).focus(),$("#msg")[0].selectionStart=b,$("#msg")[0].selectionEnd=c+7):(addBreak="",plusNum=3,console.log(c),console.log(a.length),c==a.length&&0!==c&&(addBreak="\r",plusNum=4),a.splice(b,0,addBreak+"[q][/q]"),returnText=a.join(""),$("#msg").val(returnText).focus(),$("#msg")[0].selectionStart=b+plusNum,$("#msg")[0].selectionEnd=b+plusNum)},list:function(){var a=$("#msg").val().split(""),b=$("#msg")[0].selectionStart,c=$("#msg")[0].selectionEnd;c!=b?(a.splice(c,0,"[/l]"),a.splice(b,0,"[l]"),returnText=a.join(""),$("#msg").val(returnText).focus(),$("#msg")[0].selectionStart=b,$("#msg")[0].selectionEnd=c+4):(a.splice(b,0,"\r[l][/l]"),returnText=a.join(""),$("#msg").val(returnText).focus(),$("#msg")[0].selectionStart=b+4,$("#msg")[0].selectionEnd=b+4)}},openPopup:function(a){$("html, body").css("overflow","hidden"),$("#fader").fadeIn("fast"),$("#"+a).css("top",-$("#"+a).height()),getLeft=$(window).width()/2-$("#"+a).width()/2,getTop=$(window).height()/2-$("#"+a).height()/2,$("#"+a).css({left:getLeft}),$("#"+a).show(),$("#"+a).stop().animate({top:getTop+20},500,function(){$(this).stop().animate({top:getTop})})},closePopup:function(){$("html, body").css("overflow",""),$("#fader").fadeOut("fast"),$(".popup:visible").stop().animate({top:-$(".popup:visible").height()})},timers:[],secs:0,runTimers:function(){PC.secs++,clearTimeout(PC.timers[0]),PC.timers[0]=setTimeout(function(){PC.runTimers()},1e3),$.each($(".timer"),function(a,b){PC.updateTimer(a,b)})},updateTimer:function(a,b){if(b=$(b),delta=parseInt(b.attr("attr-time")),nobr=0,b.attr("attr-br")&&(nobr=1),delta<1||!delta)return void b.html("Live");b.attr("attr-time",delta-1);var c=Math.floor(delta/86400);delta-=86400*c;var d=Math.floor(delta/3600)%24;delta-=3600*d;var e=Math.floor(delta/60)%60;dayStr=g.str.days,1==c&&(dayStr=g.str.day);var f="";c>0&&(f+=c+" "+dayStr,f+=1!=nobr?"<br />":" "),10>d&&(d="0"+d),10>e&&(e="0"+e),f+=d+":"+e,b.html()!=f&&b.html(f)},likeInProgress:0,like:function(a){if(1==this.likeInProgress)return!1;var b=parseInt($(a).attr("attr-news-id"));this.likeInProgress=1;var c={type:"POST",timeout:1e4,data:{ajax:"newsVote",id:parseInt($(a).attr("attr-news-id"))},success:function(c){return PC.likeInProgress=0,answer=c.split(";"),1==answer[0]&&("+ 1"==answer[1]?($(a).find(".like-icon").addClass("active"),$("#news-like-"+b).html(parseInt($("#news-like-"+b).html())+1)):($(a).find(".like-icon").removeClass("active"),$("#news-like-"+b).html(parseInt($("#news-like-"+b).html())-1))),!1}};this.ajax(c)},submitContactForm:function(a){if(1==this.formInProgress)return!1;this.formInProgress=1,$(a).addClass("loading"),$(".contact-form #error").hide();var b={type:"POST",data:{ajax:"submitContactForm",form:$(".contact-form").serialize()},success:function(b){return answer=b.split(";"),1==answer[0]?($(".contact-form").slideUp("fast"),$(".success-sent").slideDown("fast"),$(".success-sent p").html(answer[1])):(PC.formInProgress=0,$(a).removeClass("loading"),$(".contact-form #error p").html(answer[1]),$(".contact-form #error").slideDown("fast")),!1},error:function(){PC.formInProgress=0,$(a).removeClass("loading")}};this.ajax(b)},statusCheck:function(){$("#fightStatus").removeClass("online").removeClass("red");var a={type:"POST",data:{ajax:"statusCheck"},success:function(a){a=a.split(";"),"online"==a[2]&&$("#fightStatus").addClass("online"),2==a[0]&&$("#fightStatus").addClass("red"),$("#fightStatus").html(a[2])}};this.ajax(a)},social:{vk:function(){return this.get_token("vk"),!1},tw:function(){return this.get_token("tw"),!1},gp:function(){return this.get_token("gp"),!1},fb:function(){return this.get_token("fb"),!1},tc:function(){return this.get_token("tc"),!1},bn:function(){return this.get_token("bn"),!1},st:function(){return this.get_token("st"),!1},get_token:function(a){var b={type:"POST",data:{ajax:"socialLogin",provider:a},success:function(a){PC.social.auth_redirect(a)}};PC.ajax(b)},auth_redirect:function(a){data=a.split(";"),"0"!=data[0]?window.location.href=a:alert(data[1])},windowSocial:"",connect:function(a){PC.social.windowSocial=window.open("","connectSocial","width=800, height=600, scrollbars=no");var b={type:"POST",data:{ajax:"socialLogin",provider:a},success:function(a){return data=a.split(";"),0===data[0]?(alert(data[1]),PC.social.windowSocial.close(),!1):void(PC.social.windowSocial.location=data[0])}};PC.ajax(b)},disconnect:function(a){var b={type:"POST",data:{ajax:"socialDisconnect",provider:a},success:function(a){return data=a.split(";"),1!=data[0]?(alert(data[1]),!1):void location.reload()}};PC.ajax(b)}},addTeam:function(a){if(a||(a="registerInLoL"),1==this.formInProgress)return!1;this.formInProgress=1,$("#da-form .message").hide(),$("#da-form .message").removeClass("error success"),$("#add-team").addClass("alpha");var b={type:"POST",dataType:"json",data:{ajax:a,form:$("#da-form").serialize()},success:function(a){$("#add-team").removeClass("alpha"),PC.formInProgress=0,1==a.ok?($("#register-url a").trigger("click"),$("#join-form").slideUp(1e3,function(){$(".reg-completed").slideDown(1e3)})):$.each(a.err,function(a,b){answ=b.split(";"),$("#"+a+"-msg").html(answ[1]),$("#"+a+"-msg").show(),$("#"+a+"-msg").addClass(1==answ[0]?"success":"error")})},error:function(){$("#add-team").removeClass("alpha"),PC.formInProgress=0,alert("Something went wrong... Contact admin at info@pcesports.com")}};this.ajax(b)},editPlayerLan:function(a){if(1==this.formInProgress)return!1;this.formInProgress=1,$(".team-edit-completed").hide(),$("#da-form .message").hide(),$("#da-form .message").removeClass("error success"),a.addClass("alpha");var b={type:"POST",dataType:"json",data:{ajax:"editInLanHS",form:$("#da-form").serialize()},success:function(a){$("#edit-player-lan").removeClass("alpha"),PC.formInProgress=0,$.each(a.err,function(a,b){answ=b.split(";"),$("#"+a+"-msg").html(answ[1]),$("#"+a+"-msg").show(),$("#"+a+"-msg").addClass(1==answ[0]?"success":"error")}),1==a.ok&&$(".team-edit-completed").slideDown(1e3)},error:function(){$("#edit-player-lan").removeClass("alpha"),PC.formInProgress=0,alert("Something went wrong... Contact admin at info@pcesports.com")}};this.ajax(b)},editTeam:function(a){if(1==this.formInProgress)return!1;this.formInProgress=1,$("#da-form .message").hide(),$("#da-form .message").removeClass("error success"),$(".reg-completed").hide(),a.addClass("alpha");var b={type:"POST",dataType:"json",data:{ajax:"editInLOL",form:$("#da-form").serialize()},success:function(a){$("#edit-team").removeClass("alpha"),PC.formInProgress=0,$.each(a.err,function(a,b){answ=b.split(";"),$("#"+a+"-msg").html(answ[1]),$("#"+a+"-msg").show(),$("#"+a+"-msg").addClass(1==answ[0]?"success":"error")}),1==a.ok&&$(".reg-completed").slideDown(1e3)},error:function(){$("#edit-team").removeClass("alpha"),PC.formInProgress=0,alert("Something went wrong... Contact admin at info@pcesports.com")}};this.ajax(b)},addLanPlayer:function(){if(1==this.formInProgress)return!1;this.formInProgress=1,$("#da-form .message").hide(),$("#da-form .message").removeClass("error success"),$("#add-player-lan").addClass("alpha");var a={type:"POST",dataType:"json",data:{ajax:"registerInLanHS",form:$("#da-form").serialize()},success:function(a){$("#add-player-lan").removeClass("alpha"),PC.formInProgress=0,1==a.ok?($("#register-url a").trigger("click"),$("#join-form").slideUp(1e3,function(){$(".reg-completed").slideDown(1e3)})):$.each(a.err,function(a,b){answ=b.split(";"),$("#"+a+"-msg").html(answ[1]),$("#"+a+"-msg").show(),$("#"+a+"-msg").addClass(1==answ[0]?"success":"error")})},error:function(){$("#add-player-lan").removeClass("alpha"),PC.formInProgress=0,alert("Something went wrong... Contact admin at info@pcesports.com")}};this.ajax(a)},addPlayer:function(){if(1==this.formInProgress)return!1;this.formInProgress=1,$("#da-form .message").hide(),$("#da-form .message").removeClass("error success"),$("#add-player").addClass("alpha");var a={type:"POST",dataType:"json",data:{ajax:"registerInHS",form:$("#da-form").serialize()},success:function(a){$("#add-player").removeClass("alpha"),PC.formInProgress=0,1==a.ok?($("#register-url a").trigger("click"),$("#join-form").slideUp(1e3,function(){$(".reg-completed").slideDown(1e3)})):$.each(a.err,function(a,b){answ=b.split(";"),$("#"+a+"-msg").html(answ[1]),$("#"+a+"-msg").show(),$("#"+a+"-msg").addClass(1==answ[0]?"success":"error")})},error:function(){$("#add-player").removeClass("alpha"),PC.formInProgress=0,alert("Something went wrong... Contact admin at info@pcesports.com")}};this.ajax(a)},updateProfile:function(){if(1==this.formInProgress)return!1;this.formInProgress=1,$(".profile #error").hide(),$(".profile #success").hide(),$("#updateProfile").addClass("alpha");var a={type:"POST",data:{ajax:"updateProfile",form:$(".profile").serialize()},success:function(a){$("#updateProfile").removeClass("alpha"),PC.formInProgress=0,data=a.split(";"),1!=data[0]?($(".profile #error p").text(data[1]),$(".profile #error").slideDown(1e3)):($(".profile #success p").text(data[1]),$(".profile #success").slideDown(1e3),$(".profile #name").val()&&$("#name_not_set").slideUp("fast"),$(".profile #email").val()&&$("#email_not_set").slideUp("fast"))},error:function(){alert("Something went wrong... Contact admin at info@pcesports.com")}};this.ajax(a)},ajax:function(a){return a.url||(a.url=this.site),a.async||(a.async=!0),a.dataType||(a.dataType=""),a.success||(a.success=function(a){alert(a)}),a.data||(a.data={}),a.type||(a.type="GET"),a.xhrFields||(a.xhrFields={withCredentials:!0}),a.crossDomain||(a.crossDomain=!0),a.cache||(a.cache=!0),a.timeout||(a.timeout=6e4),a.error||(a.error=function(b,c,d){console.log(a.url),console.log(b),console.log(c),console.log(d)}),$.ajax({url:a.url,type:a.type,async:a.async,data:a.data,dataType:a.dataType,xhrFields:a.xhrFields,crossDomain:a.crossDomain,cache:a.cache,timeout:a.timeout,success:a.success,error:a.error})}};1==requireStatus&&(PC.statusCheck(),setInterval(function(){PC.statusCheck()},15e3)),PC.runTimers();