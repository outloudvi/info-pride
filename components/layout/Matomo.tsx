import Script from 'next/script'

const trackingSrc = `
var _paq = window._paq = window._paq || [];
_paq.push(['trackPageView']);
_paq.push(['enableLinkTracking']);
(function () {
    const u = "https://tomo.outv.im/js/";
    _paq.push(['setTrackerUrl', u]);
    _paq.push(['setSiteId', '1']);
    var d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];
    g.async = true; g.src = u; s.parentNode.insertBefore(g, s);
})();`.trim()

export default function Matomo() {
    return <Script id="matomo">{trackingSrc}</Script>
}
