// Base for Big Dome Pushbutton, such as this one:
// https://www.sparkfun.com/products/9181
//
// Copyright (C) 2016, Uri Shaked. 
// License: CC-BY 4.0, https://creativecommons.org/licenses/by/4.0/

difference() {
    union() {
        cube([15,33,9]);

        translate([20-13.5,20-3.5,0])
        cylinder(r=20,h=2);
    };

    
    translate([2.5,(33-28.25)/2,3])
    cube([10,28.25,6]);
    
    translate([2.5+1.5,(33-28.25)/2,0])
    cube([7,12.8,3]);
    
    translate([2.5-2.2,33-9-(33-28.25)/2,3])
    cube([2.2,9,8]);
    
    translate([2.5+1.5,0,3+4.2])
    cube([7,12.8,3]);

    translate([6.75,0,2])
    cube([1.5,3,7]);
}
