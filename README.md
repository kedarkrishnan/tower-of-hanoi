# Tower of Hanoi
Tower of Hanoi using HTML5 and Jquery.

[Demo](https://kedarkrishnan.github.io/tower-of-hanoi/)

<img src="tower-of-hanoi.png" alt="Tower of Hanoi">

## Learnings
* Drag Drop does not work with Fire Fox as it needs drag start event 'ondragstart' to set some data so that the drag effect takes effect.
* Jquery does not detect 'ondragstart' event
* Hence the 'ondragstart' event has to be set on the disk as a HTML event listener