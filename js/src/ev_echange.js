    var tiles = new MM.TemplatedLayer("http://tile.stamen.com/toner/{Z}/{X}/{Y}.png");
    var map = new MM.Map("map", tiles);



    var paris = new MM.Location(48.866990, 2.345343),
    lyon = new MM.Location(45.751608, 4.841301);
    var extent = new MM.Extent(paris, lyon);
    map.setExtent(extent);

    // map.setCenterZoom(new com.modestmaps.Location(48.866990, 2.345343), 14);
    map.setCenterZoom(new com.modestmaps.Location(paris), 14);