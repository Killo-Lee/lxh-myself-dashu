//dom获取封装
function $(dom) {
    if (document.querySelectorAll(dom).length > 1) {
        return document.querySelectorAll(dom);
    } else {
        return document.querySelector(dom);
    }
}
// 手机端侧边栏
$(".mobile .nav span").onclick = function () {
    $(".mobile .aside").style.transform = "translate(0,0)";
}
$(".mobile .aside h1 img").onclick = function () {
    $(".mobile .aside").style.transform = "translate(200%,0)";
}
//banner轮播图
banner()
function banner() {
    var swiper = new Swiper('#swiper1', {
        //显示slides个数
        slidesPerView: 1,
        //slides间隔
        spaceBetween: 30,
        //无限循环
        loop: true,
        //鼠标拖动是否生效
        simulateTouch: true,
        //切换的效果：默认为"slide"，"fade"（淡入）、"cube"（方块）、"coverflow"（3d流）、"flip"（3d翻转）、"cards"(卡片式)、"creative"（创意性）
        effect: "fade",
        //是否自动播放
        autoplay: {
            //多长时间执行一次
            delay: 2500,
            // 当设置为false时，用户操作之后（swipes,arrow以及pagination 点击）autoplay不会被禁掉
            disableOnInteraction: false,
        },
        //分页器
        pagination: {
            el: '#swiper1-pagination',
            //鼠标点击是否生效
            clickable: true,
        },
        //上下页

    });
    //鼠标指向的时候停止，离开的时候继续继续播放，
    swiper.el.onmouseover = function () {
        console.log(swiper);
        swiper.autoplay.stop();
    }
    swiper.el.onmouseout = function () {
        swiper.autoplay.start();
    }

}
console.log($(".solute-tag>div"), "tag");
//选项卡
tab(".solute-tag>div", ".solute-mian .tab", "onmouseenter")

// 客户案例
const url = 'http://www.dashoo.cn'
var caseData = [
    {
        image: url+'/uploadfile/2023621/126464541232172.jpg',
        title: '301 解放军总医院',
        description: '301 解放军总医院提出的研学平台涵盖了庞大的知识库体系以及仿真实训操作培训课程：1.辅助完成科学的实验设计，促进科研效率和产出，解决科研培训的信息化和智能化需求；2.科研信息知识库提供实验技术、实验设备、试剂耗材等研究对象的数据查询浏览和数据关系查询功能，构建完善的知识图谱。'
    },
    {
        image: url+'/uploadfile/2022613/789986526118.png',
        title: '四川大学华西医院',
        description: '四川大学华西医院是中国西部疑难危急重症诊疗的国家级中心，也是世界规模第一的综合性单点医院，拥有中国规模最大、最早整体通过美国病理家学会（CAP）检查认可的医学检验中心。'
    },
    {
        image: url+'/uploadfile/2022424/86565652145.png',
        title: '中国医科大学附属盛京医院',
        description: '中国医科大学附属盛京医院是一所大型综合性现代化数字化大学附属医院。医院有南湖、滑翔和沈北3个医疗院区，均位于辽宁省沈阳市，总建筑面积69.20万平方米'
    }
];

// 当前案例索引
var currentCaseIndex = 0;

// 切换案例函数
function changeCase(direction) {
    // 计算新的索引
    var newIndex = currentCaseIndex + direction;

    // 边界处理
    if (newIndex < 0) {
        newIndex = caseData.length - 1;
    } else if (newIndex >= caseData.length) {
        newIndex = 0;
    }

    // 更新当前索引
    currentCaseIndex = newIndex;

    // 更新显示，传递方向参数
    updateCaseDisplay(currentCaseIndex, direction);
}

// 更新案例显示
function updateCaseDisplay(index, direction) {
    var data = caseData[index];
    if (!data) return;

    // 获取元素
    var caseImgContainer = document.querySelector('.company-img > div');
    var caseImg = document.querySelector('.company-img img');
    var caseTitle = document.querySelector('.company-content h6');
    var caseDesc = document.querySelector('.company-content p');

    // 创建新的图片元素用于过渡
    var newImg = document.createElement('img');
    newImg.src = data.image;
    newImg.style.position = 'absolute';
    newImg.style.top = '0';
    newImg.style.left = '0';
    newImg.style.width = '700px';
    newImg.style.height = '450px';
    newImg.style.objectFit = 'cover';
    newImg.style.opacity = '0';
    newImg.style.transform = direction > 0 ? 'translateX(700px)' : 'translateX(-700px)';
    newImg.style.transition = 'transform 0.5s ease, opacity 0.5s ease';

    // 添加文字淡出效果
    if (caseTitle) {
        caseTitle.style.transform = 'translateY(-10px)';
        caseTitle.style.opacity = '0';
    }
    if (caseDesc) {
        caseDesc.style.transform = 'translateY(-10px)';
        caseDesc.style.opacity = '0';
    }

    // 如果容器存在，添加新图片
    if (caseImgContainer) {
        caseImgContainer.style.position = 'relative';
        caseImgContainer.style.overflow = 'hidden';
        caseImgContainer.appendChild(newImg);

        // 当前图片滑出
        if (caseImg) {
            caseImg.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
            caseImg.style.transform = direction > 0 ? 'translateX(-700px)' : 'translateX(700px)';
            caseImg.style.opacity = '0';
        }

        // 新图片滑入
        setTimeout(function() {
            newImg.style.transform = 'translateX(0)';
            newImg.style.opacity = '1';
        }, 50);

        // 清理旧图片，更新内容
        setTimeout(function() {
            if (caseImg) {
                caseImg.src = data.image;
                caseImg.style.transition = 'none';
                caseImg.style.transform = 'translateX(0)';
                caseImg.style.opacity = '1';
            }
            if (newImg.parentNode) {
                newImg.parentNode.removeChild(newImg);
            }

            // 更新文字内容并淡入
            if (caseTitle) {
                caseTitle.textContent = data.title;
                caseTitle.style.transition = 'all 0.4s ease 0.1s';
                caseTitle.style.transform = 'translateY(0)';
                caseTitle.style.opacity = '1';
            }
            if (caseDesc) {
                caseDesc.textContent = data.description;
                caseDesc.style.transition = 'all 0.4s ease 0.2s';
                caseDesc.style.transform = 'translateY(0)';
                caseDesc.style.opacity = '1';
            }
        }, 500);
    }
}

// 初始化案例显示
function initCaseDisplay() {
    var data = caseData[0];
    if (!data) return;

    var caseImg = document.querySelector('.company-img img');
    var caseTitle = document.querySelector('.company-content h6');
    var caseDesc = document.querySelector('.company-content p');

    if (caseImg) caseImg.src = data.image;
    if (caseTitle) caseTitle.textContent = data.title;
    if (caseDesc) caseDesc.textContent = data.description;
}

// 页面加载完成后初始化
initCaseDisplay();

// 公司优势轮播图 - 移动端
var companyCardsCurrentIndex = 0;
var companyCardsTotal = 5; // 总共5张卡片
var companyCardsPerPage = 2; // 每页显示2张
var companyCardsMaxIndex = Math.ceil(companyCardsTotal / companyCardsPerPage) - 1; // 最大页数
var companyCardsAutoPlayTimer = null;
var companyCardsAutoPlayInterval = 3000; // 自动轮播间隔3秒

function changeCompanyCards(direction) {
    // 只在移动端生效
    if (window.innerWidth > 768) return;
    
    var newIndex = companyCardsCurrentIndex + direction;
    
    // 循环轮播处理
    if (newIndex < 0) {
        newIndex = companyCardsMaxIndex;
    } else if (newIndex > companyCardsMaxIndex) {
        newIndex = 0;
    }
    
    companyCardsCurrentIndex = newIndex;
    
    // 更新轮播位置
    updateCompanyCardsPosition();
}

function updateCompanyCardsPosition() {
    var track = document.querySelector('.company-cards-track');
    var prevBtn = document.querySelector('.company-cards-prev');
    var nextBtn = document.querySelector('.company-cards-next');
    
    if (track) {
        var translateX = -(companyCardsCurrentIndex * 100);
        track.style.transform = 'translateX(' + translateX + '%)';
    }
    
    // 更新按钮状态（循环模式下按钮始终可用）
    if (prevBtn) {
        prevBtn.disabled = false;
        prevBtn.style.opacity = '1';
    }
    if (nextBtn) {
        nextBtn.disabled = false;
        nextBtn.style.opacity = '1';
    }
}

// 自动轮播
function startCompanyCardsAutoPlay() {
    // 只在移动端启动自动轮播
    if (window.innerWidth > 768) return;
    
    stopCompanyCardsAutoPlay();
    companyCardsAutoPlayTimer = setInterval(function() {
        changeCompanyCards(1);
    }, companyCardsAutoPlayInterval);
}

function stopCompanyCardsAutoPlay() {
    if (companyCardsAutoPlayTimer) {
        clearInterval(companyCardsAutoPlayTimer);
        companyCardsAutoPlayTimer = null;
    }
}

// 初始化公司优势轮播图
function initCompanyCardsNav() {
    var prevBtn = document.querySelector('.company-cards-prev');
    var nextBtn = document.querySelector('.company-cards-next');
    var companyCards = document.querySelector('.company-cards');
    
    // 设置按钮状态
    if (prevBtn) {
        prevBtn.disabled = false;
        prevBtn.style.opacity = '1';
    }
    if (nextBtn) {
        nextBtn.disabled = false;
        nextBtn.style.opacity = '1';
    }
    
    // 鼠标悬停时停止自动轮播，离开时恢复
    if (companyCards) {
        companyCards.addEventListener('mouseenter', function() {
            stopCompanyCardsAutoPlay();
        });
        companyCards.addEventListener('mouseleave', function() {
            if (window.innerWidth <= 768) {
                startCompanyCardsAutoPlay();
            }
        });
        
        // 触摸事件支持
        companyCards.addEventListener('touchstart', function() {
            stopCompanyCardsAutoPlay();
        }, { passive: true });
        
        companyCards.addEventListener('touchend', function() {
            if (window.innerWidth <= 768) {
                startCompanyCardsAutoPlay();
            }
        }, { passive: true });
    }
    
    // 启动自动轮播
    startCompanyCardsAutoPlay();
}

// 页面加载完成后初始化
initCompanyCardsNav();

// 窗口大小变化时重置轮播
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        // 桌面端重置
        var track = document.querySelector('.company-cards-track');
        if (track) {
            track.style.transform = 'translateX(0)';
        }
        companyCardsCurrentIndex = 0;
        stopCompanyCardsAutoPlay();
    } else {
        // 移动端启动自动轮播
        startCompanyCardsAutoPlay();
    }
});

// ==================== 合作客户轮播图 (2x4结构) ====================
var hardwareCurrentIndex = 0;
var hardwareTotalGroups = 2; // 总共2组
var hardwareAutoPlayTimer = null;
var hardwareAutoPlayInterval = 3000; // 自动轮播间隔3秒

function changeHardwareGroup(direction) {
    var newIndex = hardwareCurrentIndex + direction;
    
    // 循环轮播处理
    if (newIndex < 0) {
        newIndex = hardwareTotalGroups - 1;
    } else if (newIndex >= hardwareTotalGroups) {
        newIndex = 0;
    }
    
    hardwareCurrentIndex = newIndex;
    
    // 更新轮播位置
    updateHardwarePosition();
}

function updateHardwarePosition() {
    var track = document.querySelector('.hardware-carousel-track');
    
    if (track) {
        var translateX = -(hardwareCurrentIndex * 100);
        track.style.transform = 'translateX(' + translateX + '%)';
    }
}

// 自动轮播
function startHardwareAutoPlay() {
    stopHardwareAutoPlay();
    hardwareAutoPlayTimer = setInterval(function() {
        changeHardwareGroup(1);
    }, hardwareAutoPlayInterval);
}

function stopHardwareAutoPlay() {
    if (hardwareAutoPlayTimer) {
        clearInterval(hardwareAutoPlayTimer);
        hardwareAutoPlayTimer = null;
    }
}

// 初始化合作客户轮播图
function initHardwareCarousel() {
    var carousel = document.querySelector('.hardware-carousel');
    
    // 鼠标悬停时停止自动轮播，离开时恢复
    if (carousel) {
        carousel.addEventListener('mouseenter', function() {
            stopHardwareAutoPlay();
        });
        carousel.addEventListener('mouseleave', function() {
            startHardwareAutoPlay();
        });
        
        // 触摸事件支持
        carousel.addEventListener('touchstart', function() {
            stopHardwareAutoPlay();
        }, { passive: true });
        
        carousel.addEventListener('touchend', function() {
            startHardwareAutoPlay();
        }, { passive: true });
    }
    
    // 启动自动轮播
    startHardwareAutoPlay();
}

// 页面加载完成后初始化
initHardwareCarousel();

// 新闻资讯标签切换功能
function switchNewsTab(index) {
    // 切换标签样式
    const tabs = document.querySelectorAll('.news-tabs .tab');
    tabs.forEach((tab, i) => {
        if (i === index) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });

    // 切换内容面板
    const panels = document.querySelectorAll('.news-panel');
    panels.forEach((panel, i) => {
        if (i === index) {
            panel.classList.add('active');
        } else {
            panel.classList.remove('active');
        }
    });
}



