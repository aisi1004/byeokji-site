/* 언어 선택: 저장된 선택 → 브라우저 언어(ko/ja, 그 외 en) 순으로 정한다 */
(function () {
  'use strict';
  var KEY = 'site-lang';
  function pick() {
    try { var s = localStorage.getItem(KEY); if (s === 'ko' || s === 'en' || s === 'ja') return s; } catch (e) {}
    var q = (location.search.match(/[?&]lang=(ko|en|ja)\b/) || [])[1];
    if (q) return q;
    var l = String((navigator.languages && navigator.languages[0]) || navigator.language || 'en').toLowerCase();
    return l.indexOf('ko') === 0 ? 'ko' : l.indexOf('ja') === 0 ? 'ja' : 'en';
  }
  function apply(l, remember) {
    document.documentElement.lang = l;
    var btns = document.querySelectorAll('.lang button');
    for (var i = 0; i < btns.length; i++) btns[i].className = btns[i].getAttribute('data-set') === l ? 'on' : '';
    if (remember) { try { localStorage.setItem(KEY, l); } catch (e) {} }
  }
  var btns = document.querySelectorAll('.lang button');
  for (var i = 0; i < btns.length; i++) {
    btns[i].onclick = function () { apply(this.getAttribute('data-set'), true); };
  }
  apply(pick(), false);
})();
