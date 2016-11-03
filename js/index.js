$(function(){
	/*header-top子导航*/
	var $subNav = $('.sub-nav'),
	$webnav = $('.astyle').last('a');
	$webnav.on('mouseenter',function(){
		$subNav.show();
	}).on('mouseleave',function(){
		$subNav.hide();
	});
	$subNav.on('mouseenter',function(){
		$subNav.show();
	}).on('mouseleave',function(){
		$subNav.hide();
	});
	
	/*主导航*/
	var $menuRight1 = $('.menu-right a').eq(0),
	$menuRight2 = $('.menu-right a').eq(1),
	$group1 = $('.group1'),
	$group2 = $('.group2');
	$menuRight1.on('mouseenter',function(){
		$group1.show();
	}).on('mouseleave',function(){
		$group1.hide();
	});
	$group1.on('mouseenter',function(){
		$group1.show();
	}).on('mouseleave',function(){
		$group1.hide();
	});
	$menuRight2.on('mouseenter',function(){
		$group2.show();
	}).on('mouseleave',function(){
		$group2.hide();
	});
	$group2.on('mouseenter',function(){
		$group2.show();
	}).on('mouseleave',function(){
		$group2.hide();
	});
	var $itemNav = $('.item-nav'),
	$navLi = $itemNav.find('li'),
	$navI = $itemNav.find('i'),
	$move = $('.move'),
	$items = $('.item-type a');
	$navLi.on('mouseenter',function(){
		$(this).css({
			background: '#333',
			border    : 'none'
			});
		$(this).find('.move').css('color','#fff').stop().animate({'margin-left':'5px'},200);
		$(this).find('.item-type > a:not(.red)').css('color','#fff');
		$(this).find('i').css('background','url(img/tb0'+($(this).index()+1)+'.png) no-repeat');
		
		$(this).find('.aside-nav').fadeIn();
		
	});
	$navLi.on('mouseleave',function(){
		$(this).css({
			background   : '#EBEBEB',
			borderBottom : '1px dotted  #ccc'
			});
		$(this).find('.move').css('color','#000').stop().animate({'margin-left':'0px'},200);
		$(this).find('.item-type > a:not(.red)').css('color','#555');
		$(this).find('i').css('background','url(img/tb' + ($(this).index() + 1) + '.png) no-repeat');
		$(this).find('.aside-nav').css('display','none');
	});
	
	/*首页banner图切换*/
	var $bacontainer = $('.banner'),
	$banner = $('.banner div'),
	$btngroup = $('.btngroup li'),
	//初始为0，指向第一张图
	prev = 0;
	var timer = null;
	commonTab($banner,prev,$btngroup,'selected',timer,4000,$bacontainer);
	/*品牌列表切换*/
	var $topBtn = $('.top span'),
	nowBrand = 0;
	$topBtn.on('click',function(){
		$('ul.show').removeClass('show').siblings('ul').addClass('show');
	});
	var timer2 = setInterval(function(){
		$topBtn.trigger('click');
	},4000);
	$('.brand').on('mouseenter',function(){
		clearInterval(timer2);
	}).on('mouseleave',function(){
		timer2 = setInterval(function(){
		    $topBtn.trigger('click');
	    },4000);
	});
	
	/*新闻列表切换*/
	var $tabBtn = $('.information-nav li');
	$tabBtn.on('mouseenter',function(){
			$(this).addClass('special').siblings().removeClass('special');
			$('.information-right>div:eq(' + $(this).index() + ')').show().siblings('div').hide();
	});
	
	/*新品上市列表切换*/
	var $arrivalNavList = $('.arrival-nav>li '),
	$arrivalContent = $('.arrival-content>div'),
	$arrivalContainer = $('.arrival-top,.arrival-content');
	var arrivalTimer = null;
	var arrprev = 0;
	commonTab($arrivalContent,arrprev,$arrivalNavList,'aselected',arrivalTimer,3000,$arrivalContainer);
	
	/*main-right列表*/
	var $mainList = $('.main-right li');
	$mainList.each(function(){
		$('.normal').eq($(this).index()).css('background','url(img/0' + ($(this).index() + 1) + '.png) no-repeat left center');
	});
	$mainList.on('mouseenter',function(){
		$mainList.each(function(){
			$('.normal').eq($(this).index()).show();
		    $('.detail').eq($(this).index()).hide();
		});
		$('.normal').eq($(this).index()).hide();
		$('.detail').eq($(this).index()).show();
	});		
	
	/*切换方法*/
	/*
	 bannerList:要切换的列表
	 prev:上一张图片
	 btnList:按钮列表
	 className:类名
	 timer:定时器
	 speed:轮播间隔时间
	 continer:容器
	 * */
	
	function commonTab(bannerList,prev,btnList,className,timer,speed,container){
		
		clearInterval(timer);
		btnList.on('mouseover',function(){
			if(prev == $(this).index()){
				return false;
			}
			btnList.each(function(){
			    $(this).removeClass(className);
		    });
			bannerList.eq(prev).stop().fadeOut(1500);
			bannerList.eq($(this).index()).stop().fadeIn(1500);
			$(this).addClass(className);
		    prev = $(this).index();
		});
		
		timer = setInterval(tab,speed);
		/*要用mouseenter,mouseleave，防止事件冒泡*/
		container.on('mouseenter',function(){
			clearInterval(timer);
		}).on('mouseleave',function(){
			timer = setInterval(tab,speed);
		});
		function tab(){
			bannerList.eq(prev).stop().fadeOut(1500);
			if(prev == bannerList.length - 1){
				prev = -1;
			}
			bannerList.eq(prev + 1).stop().fadeIn(1500);
			btnList.each(function(){
				$(this).removeClass(className);
			});
			btnList.eq(prev + 1).addClass(className);
			prev++;
		    
		}
	}
	
	/*友情链接滚动*/
	var $friendslink = $('.friendslink'),
	l=$friendslink.scrollLeft();
	var friendsTimer = setInterval(function(){
		$friendslink.scrollLeft(l++) ;
        if(l == 500){
        	l = 0;
        }
	},40);
	
	/*不能使用hover*/
	$friendslink.on('mouseenter',function(){
		clearInterval(friendsTimer);
	});	
	$friendslink.on('mouseleave',function(){
			friendsTimer = setInterval(function(){
		        $friendslink.scrollLeft(l++) ;
                if(l == 500){
        	        l = 0;
                }
	        },40);
	});
	
	/*显示悬浮条*/
	$(window).scroll(function(){
		if($(window).scrollTop() > $(window).height()){
		    $('.aside-search').slideDown('slow');
		    $('.aside-bar').fadeIn();
		   
	    }else{
	    	$('.aside-search').slideUp('slow');
		    $('.aside-bar').fadeOut();
	    }
	});
	
   
});
/*点击向上箭头则页面回到顶部*/
function asideTop(){
    var i=$(window).scrollTop();
	var timer6 = setInterval(function(){
		$(window).scrollTop(i);
		//每次滚动距离随离页面顶部的距离而定，若离顶部距离小则滚动距离小
		i=i-i/10;
		if($(window).scrollTop() == 0){	
			clearInterval(timer6);
		}
	},1);
		   
		    
		   
}