$(document).ready(function(){
	$('.nav>li>a').click(function(event){
		$('.nav>li').each(function(i){
			if($(this).hasClass('active'))
				$(this).removeClass('active');
		});
		$(this).parent().addClass('active');
	});

	$('#draw').on('click', '.draw-card', function(event){
		var award = POS2AWARD[$(this).attr('pos')];
		$(this).hide(500, function(){
			$(this).removeClass('draw-card');
			$(this).addClass('drawed-card');
			var level = award['level'];
			if(level){
				$(this).append(level + '等奖').append('<br>').append(award['label']).append('<br>');
			}
			else{
				$(this).append(award['label']).append('<br>');
			}
			var $img = $('<img>').addClass('card-img').attr('src', './awards/img/' + award['pic']).appendTo($(this));
			$(this).show(500);
		});
	});

	loadAwards();
});

function loadAwards(){
	if(AWARDS == null)
		alert('error!!!');

	var awards = AWARDS['awards'];
	var matched = new Set();
	PNUM = AWARDS['pnum'];
	POS2AWARD = {};
	var anum = 0;
	$.each(awards, function(i, award){
		var level = award['level'];
		var $target = $('#award-' + level);
		$target.find('.page-img').attr('src', './awards/img/' + award['pic']);
		$target.find('.page-icontent').text(award['label'] + ' × ' + award['number']);
		var num = award['number'];
		for(var t = 0; t < num; t++){
			while(true){
				var rand = Math.floor(Math.random()*PNUM);
				if(matched.contains(rand))
					continue;
				POS2AWARD[rand] = award;
				matched.add(rand);
				// console.log('match:');
				// console.log(JSON.stringify(award));
				// console.log('pos:' + rand);
				break;
			}
			anum++;
		}
	});
	var defaultAward = AWARDS['default'];
	var $target = $('#award-default');
	$target.find('.page-img').attr('src', './awards/img/' + defaultAward['pic']);
	$target.find('.page-icontent').text(defaultAward['label'] + ' × ' + (PNUM - anum));
	for(var ai = anum; ai < PNUM; ai++){
		for(var pos = 0; pos < PNUM; pos++){
			if(matched.contains(pos))
				continue;
			POS2AWARD[pos] = defaultAward;
			matched.add(pos);
			break;
		}
	}

	var $target = $('#draw').find('.page-content');
	var $row = $('<div>').addClass('row').appendTo($target);
	for(var ci = 0; ci < PNUM; ci++){
		if(ci % 6 == 0){
			$row = $('<div>').addClass('row').appendTo($target);
		}
		var $card = $('<div>').addClass('draw-card').attr('pos', ci);
		var $item = $('<div>').addClass('col-md-2').appendTo($row);
		$item.append($card);
	}

	var height = $(window).height();
	$('.page-content').height(height);
}