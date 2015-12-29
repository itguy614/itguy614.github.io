---
layout: default
title: Portfolio
permalink: /portfolio/
---

<div id="portfolio">
</div>

<script type="text/javascript">

$(document).ready(function() {
    $("#portfolio").nanoGallery({
        kind:'flickr',
        userID:'23536098@N00',
        photoset: '72157660606121263',
        colorScheme: 'light',
        thumbnailWidth: 120, thumbnailHeight: 120,
        thumbnailHoverEffect: 'scale120,borderLighter',
        thumbnailLabel: {
            display:false
        },
        thumbnailLazyLoad: true,
        colorSchemeViewer: 'light',
        viewerFullscreen: false
    });
});

</script>
