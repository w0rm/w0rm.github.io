
require.config({
  paths: {
    jquery: 'http://code.jquery.com/jquery-1.10.1.min'
  , analytics: 'http://www.google-analytics.com/analytics'
  }
, shim: {
    analytics: {exports: 'ga'}
  }
})

require(['analytics'], function (ga) {
  ga('create', 'UA-43235123-1', 'unsoundscapes.com')
  ga('send', 'pageview')
})

require(['jquery'], function ($) {
  var $hair = $('.js-hair')
    , $bald = $('.js-bald')
    , hairSize = 300
    , leftX
    , topX

  function saveCircles () {
    var data = $('.js-hair:not(.is-hidden)')
                 .map(function () {
                   var d = $(this).data()
                   return [d.left, d.top, d.size / 10].join(',')
                 })
                 .get()
                 .join()

    if (history.pushState) {
      history.pushState(null, null, '#' + data)
    } else {
      location.hash = '#' + data
    }
  }

  function loadCircles () {
    var data = location.hash.substr(1)
      , left
      , top
      , size

    $('.js-hair:not(.is-hidden)').remove()

    if (!data) return;

    data = data.split(',')

    for (var i = 0, l = data.length; i < l; i = i + 3) {
      left = parseInt(data[i], 10)
      top = parseInt(data[i+1], 10)
      size = parseInt(data[i+2], 10) * 10
      $bald.append(
        $('<div class="hair js-hair"/>')
        .css({ width: size
             , height: size
             , left: left
             , top: top
             , backgroundPosition: (-left).toString() + 'px ' + (-top).toString() + 'px'
             , display: 'block'
             })
        .data({left: left, top: top, size: size})
      )

    }

  }


  function updatePosition () {

    var left = leftX - hairSize / 2
      , top = topX - hairSize / 2

    $hair.css({ left: left
              , top: top
              , backgroundPosition: (-left).toString() + 'px ' + (-top).toString() + 'px'
              , width: hairSize
              , height: hairSize
              })
  }


  $bald
    .on('mousemove', function (e) {
      leftX = e.pageX - $bald.position().left
      topX = e.pageY - $bald.position().top
      updatePosition()
    })
    .on('click', '.js-hair', function (e) {
      $clickedHair = $(e.currentTarget)
      if (!$hair.is($clickedHair)) {
        $clickedHair.remove()
      } else {
        $hair.clone().insertAfter($hair)
          .css({display: 'block'})
          .removeClass('is-hidden')
          .data({left: leftX - hairSize / 2, top: topX - hairSize / 2, size: hairSize})
      }
      saveCircles()
    })

  $(window)
    .on('keydown', function (e) {
      switch (e.keyCode) {
        case 219:
          hairSize = Math.max(hairSize - 10, 20);
          updatePosition();
          break;
        case 221:
          hairSize = Math.min(hairSize + 10, 500);
          updatePosition();
          break;
      }
    })
    .on('hashchange', loadCircles)

  loadCircles()

})
