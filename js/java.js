$(window).on('load',function(){
    // テキストを<span></span>で囲む
    $('.typing').children().addBack().contents().each(function() {
    if (this.nodeType == 3) {
    $(this).replaceWith($(this).text().replace(/(\S)/g, '<span>$1</span>'));
    }
    });
    // 一文字ずつフェードインさせる
    $('.typing').css({'opacity':1});
    for (var i = 0; i <= $('.typing').children().length; i++) {
    $('.typing').children('span:eq('+i+')').delay(120*i).animate({'opacity':1},50);
    };
    });  /*type style*/  /*delay50の部分でスピード調整*/




    $(window).scroll(function(){
        $(".passing").each(function(){
            var imgPos = $(this).offset().top;    
            var scroll = $(window).scrollTop();
            var windowHeight = $(window).height();
            if (scroll > imgPos - windowHeight + windowHeight / 4){
                $(this).addClass('move');
            }
        });
    });



    $(window).on('load',function(){
        //simple use
        $('.ex1').textyle();
        //you can select options or add callback
        $('.ex2').textyle({
                  duration : 400,
                  delay : 100,
                  easing : 'swing',
                  callback : function(){
                                $(this).css({
                                    color : 'Aquamarine',
                                    transition : '1s',
                                });
                                $('.desc').css('opacity',1);
                            }
                        });
    });





    
document.addEventListener('DOMContentLoaded', function () {
    particleground(document.getElementById('particles'), {
      dotColor: '#5cbdaa',
      lineColor: '#5cbdaa'
    });
    var intro = document.getElementById('intro');
    intro.style.marginTop = - intro.offsetHeight / 2 + 'px';
  }, false);
  


  /*bubble*/



    





/*liquidbutton*/

  $(function() {
    // Vars
    var pointsA = [],
        pointsB = [],
        $canvas = null,
        canvas = null,
        context = null,
        vars = null,
        points = 8,
        viscosity = 20,
        mouseDist = 70,
        damping = 0.05,
        showIndicators = false;
        mouseX = 0,
        mouseY = 0,
        relMouseX = 0,
        relMouseY = 0,
        mouseLastX = 0,
        mouseLastY = 0,
        mouseDirectionX = 0,
        mouseDirectionY = 0,
        mouseSpeedX = 0,
        mouseSpeedY = 0;

    /**
     * Get mouse direction
     */
    function mouseDirection(e) {
        if (mouseX < e.pageX)
            mouseDirectionX = 1;
        else if (mouseX > e.pageX)
            mouseDirectionX = -1;
        else
            mouseDirectionX = 0;

        if (mouseY < e.pageY)
            mouseDirectionY = 1;
        else if (mouseY > e.pageY)
            mouseDirectionY = -1;
        else
            mouseDirectionY = 0;

        mouseX = e.pageX;
        mouseY = e.pageY;

        relMouseX = (mouseX - $canvas.offset().left);
        relMouseY = (mouseY - $canvas.offset().top);
    }
    $(document).on('mousemove', mouseDirection);

    /**
     * Get mouse speed
     */
    function mouseSpeed() {
        mouseSpeedX = mouseX - mouseLastX;
        mouseSpeedY = mouseY - mouseLastY;

        mouseLastX = mouseX;
        mouseLastY = mouseY;

        setTimeout(mouseSpeed, 50);
    }
    mouseSpeed();

    /**
     * Init button
     */
    function initButton() {
        // Get button
        var button = $('.btn-liquid');
        var buttonWidth = button.width();
        var buttonHeight = button.height();

        // Create canvas
        $canvas = $('<canvas></canvas>');
        button.append($canvas);

        canvas = $canvas.get(0);
        canvas.width = buttonWidth+100;
        canvas.height = buttonHeight+100;
        context = canvas.getContext('2d');

        // Add points

        var x = buttonHeight/2;
        for(var j = 1; j < points; j++) {
            addPoints((x+((buttonWidth-buttonHeight)/points)*j), 0);
        }
        addPoints(buttonWidth-buttonHeight/5, 0);
        addPoints(buttonWidth+buttonHeight/10, buttonHeight/2);
        addPoints(buttonWidth-buttonHeight/5, buttonHeight);
        for(var j = points-1; j > 0; j--) {
            addPoints((x+((buttonWidth-buttonHeight)/points)*j), buttonHeight);
        }
        addPoints(buttonHeight/5, buttonHeight);

        addPoints(-buttonHeight/10, buttonHeight/2);
        addPoints(buttonHeight/5, 0);
        // addPoints(x, 0);
        // addPoints(0, buttonHeight/2);

        // addPoints(0, buttonHeight/2);
        // addPoints(buttonHeight/4, 0);

        // Start render
        renderCanvas();
    }

    /**
     * Add points
     */
    function addPoints(x, y) {
        pointsA.push(new Point(x, y, 1));
        pointsB.push(new Point(x, y, 2));
    }

    /**
     * Point
     */
    function Point(x, y, level) {
      this.x = this.ix = 50+x;
      this.y = this.iy = 50+y;
      this.vx = 0;
      this.vy = 0;
      this.cx1 = 0;
      this.cy1 = 0;
      this.cx2 = 0;
      this.cy2 = 0;
      this.level = level;
    }

    Point.prototype.move = function() {
        this.vx += (this.ix - this.x) / (viscosity*this.level);
        this.vy += (this.iy - this.y) / (viscosity*this.level);

        var dx = this.ix - relMouseX,
            dy = this.iy - relMouseY;
        var relDist = (1-Math.sqrt((dx * dx) + (dy * dy))/mouseDist);

        // Move x
        if ((mouseDirectionX > 0 && relMouseX > this.x) || (mouseDirectionX < 0 && relMouseX < this.x)) {
            if (relDist > 0 && relDist < 1) {
                this.vx = (mouseSpeedX / 4) * relDist;
            }
        }
        this.vx *= (1 - damping);
        this.x += this.vx;

        // Move y
        if ((mouseDirectionY > 0 && relMouseY > this.y) || (mouseDirectionY < 0 && relMouseY < this.y)) {
            if (relDist > 0 && relDist < 1) {
                this.vy = (mouseSpeedY / 4) * relDist;
            }
        }
        this.vy *= (1 - damping);
        this.y += this.vy;
    };


    /**
     * Render canvas
     */
    function renderCanvas() {
        // rAF
        rafID = requestAnimationFrame(renderCanvas);

        // Clear scene
        context.clearRect(0, 0, $canvas.width(), $canvas.height());
        context.fillStyle = '#fff';
        context.fillRect(0, 0, $canvas.width(), $canvas.height());

        // Move points
        for (var i = 0; i <= pointsA.length - 1; i++) {
            pointsA[i].move();
            pointsB[i].move();
        }

        // Create dynamic gradient
        var gradientX = Math.min(Math.max(mouseX - $canvas.offset().left, 0), $canvas.width());
        var gradientY = Math.min(Math.max(mouseY - $canvas.offset().top, 0), $canvas.height());
        var distance = Math.sqrt(Math.pow(gradientX - $canvas.width()/2, 2) + Math.pow(gradientY - $canvas.height()/2, 2)) / Math.sqrt(Math.pow($canvas.width()/2, 2) + Math.pow($canvas.height()/2, 2));

        var gradient = context.createRadialGradient(gradientX, gradientY, 300+(300*distance), gradientX, gradientY, 0);
        gradient.addColorStop(0, '#102ce5');
        gradient.addColorStop(1, '#E406D6');

        // Draw shapes
        var groups = [pointsA, pointsB]

        for (var j = 0; j <= 1; j++) {
            var points = groups[j];

            if (j == 0) {
                // Background style
                context.fillStyle = '#1CE2D8';
            } else {
                // Foreground style
                context.fillStyle = gradient;
            }

            context.beginPath();
            context.moveTo(points[0].x, points[0].y);

            for (var i = 0; i < points.length; i++) {
                var p = points[i];
                var nextP = points[i + 1];
                var val = 30*0.552284749831;

                if (nextP != undefined) {
                    // if (nextP.ix > p.ix && nextP.iy < p.iy) {
                    //  p.cx1 = p.x;
                    //  p.cy1 = p.y-val;
                    //  p.cx2 = nextP.x-val;
                    //  p.cy2 = nextP.y;
                    // } else if (nextP.ix > p.ix && nextP.iy > p.iy) {
                    //  p.cx1 = p.x+val;
                    //  p.cy1 = p.y;
                    //  p.cx2 = nextP.x;
                    //  p.cy2 = nextP.y-val;
                    // }  else if (nextP.ix < p.ix && nextP.iy > p.iy) {
                    //  p.cx1 = p.x;
                    //  p.cy1 = p.y+val;
                    //  p.cx2 = nextP.x+val;
                    //  p.cy2 = nextP.y;
                    // } else if (nextP.ix < p.ix && nextP.iy < p.iy) {
                    //  p.cx1 = p.x-val;
                    //  p.cy1 = p.y;
                    //  p.cx2 = nextP.x;
                    //  p.cy2 = nextP.y+val;
                    // } else {

                        p.cx1 = (p.x+nextP.x)/2;
                        p.cy1 = (p.y+nextP.y)/2;
                        p.cx2 = (p.x+nextP.x)/2;
                        p.cy2 = (p.y+nextP.y)/2;

                        context.bezierCurveTo(p.x, p.y, p.cx1, p.cy1, p.cx1, p.cy1);
                    //  continue;
                    // }

                    // context.bezierCurveTo(p.cx1, p.cy1, p.cx2, p.cy2, nextP.x, nextP.y);
                } else {
nextP = points[0];
                        p.cx1 = (p.x+nextP.x)/2;
                        p.cy1 = (p.y+nextP.y)/2;

                        context.bezierCurveTo(p.x, p.y, p.cx1, p.cy1, p.cx1, p.cy1);
                }
            }

            // context.closePath();
            context.fill();
        }

        if (showIndicators) {
            // Draw points
            context.fillStyle = '#000';
            context.beginPath();
            for (var i = 0; i < pointsA.length; i++) {
                var p = pointsA[i];

                context.rect(p.x - 1, p.y - 1, 2, 2);
            }
            context.fill();

            // Draw controls
            context.fillStyle = '#f00';
            context.beginPath();
            for (var i = 0; i < pointsA.length; i++) {
                var p = pointsA[i];

                context.rect(p.cx1 - 1, p.cy1 - 1, 2, 2);
                context.rect(p.cx2 - 1, p.cy2 - 1, 2, 2);
            }
            context.fill();
        }
    }

    // Init
    initButton();
});





// Wrap every letter in a span
var textWrapper = document.querySelector('.ml2');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
  .add({
    targets: '.ml2 .letter',
    scale: [4,1],
    opacity: [0,1],
    translateZ: 0,
    easing: "easeOutExpo",
    duration: 950,
    delay: (el, i) => 70*i
  }).add({
    targets: '.ml2',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });







  // Wrap every letter in a span
var textWrapper = document.querySelector('.ml6 .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
  .add({
    targets: '.ml6 .letter',
    translateY: ["1.1em", 0],
    translateZ: 0,
    duration: 750,
    delay: (el, i) => 50 * i
  }).add({
    targets: '.ml6',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });






bubbly({
    colorStart: "#fff",
    colorStop: "#fff",
    blur: 1,
    bubbles: 220,
    compose: "source-over",
    shadowColor: "#5DB09B",
    radiusFunc: () => Math.random() * 15,
    bubbleFunc: () => `hsla(0, 0%, 80%, ${Math.random() * 0.25})`,
    angleFunc:() => -Math.PI / 2,
    velocityFunc:() => Math.random() * 3.5,
});


