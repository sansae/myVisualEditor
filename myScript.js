var cell;
var layoutTarget;
var currentLayout = {cell1: "", cell2: "", cell3: "", layoutName: ""};
var savedLayouts = [];
var opt;

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();

  var data = ev.dataTransfer.getData("text");
  //get the image being dragged
  var img = document.getElementById(data);
  //clone the image that is dragged
  var cloneImg = img.cloneNode(true);
  //appendChild() inserts the cloned node to the document
  ev.target.appendChild(cloneImg);

  //display alert message after drop
  // alert("drop was successful! " + data + " " + ev.target.id);

  if (ev.target.id === "div1") {
    // alert("target equals div1")
    // alert(data + " was dropped into " + ev.target.id);
    currentLayout.cell1 = data;
  } else if (ev.target.id === "div2") {
    currentLayout.cell2 = data;
  } else {
    currentLayout.cell3 = data;
  }
}

function addCell() {
  cell = document.createElement("div");
  document.getElementById("newCell").appendChild(cell);
}

function removeCell() {
  cell = document.getElementById("newCell");
  cell.removeChild(cell.childNodes[0]);
}

function updateDropdownMenu() {
  var myDropDownMenu = document.getElementById("dropDown");

  //now, populate the dropdown with the saved layouts
  opt = document.createElement("option");
  for (var i = 0; i < savedLayouts.length; i++) {
    opt.innerHTML = savedLayouts[i].layoutName;
    opt.value = savedLayouts[i].layoutName;
    myDropDownMenu.appendChild(opt);
  }
}

function clearLayout() {
  currentLayout = {cell1: "", layoutName: ""};
  document.getElementById("div1").innerHTML = "";
  document.getElementById("div2").innerHTML = "";
  document.getElementById("div3").innerHTML = "";
}

function save() {
  if (currentLayout.cell1 === "" && currentLayout.cell2 === "" && currentLayout.cell3 === "") {
    alert("You didn't drag and drop an image onto a cell. Please do that first before saving a layout.");
  } else {
    currentLayout.layoutName = "layout" + (savedLayouts.length + 1);

    savedLayouts.push(currentLayout);

    updateDropdownMenu();
    clearLayout();
  }
}

function load() {
  // alert(document.getElementById(savedLayouts[0].cell1));

  document.getElementById("div1").innerHTML = "";
  document.getElementById("div2").innerHTML = "";
  document.getElementById("div3").innerHTML = "";
  // // alert("hi " + currentLayout.layoutName);
  if (document.getElementById("dropDown").length === 0) {
    alert("Oops. there is nothing to load. Try saving a layout first.");
  }

  var dropDownValue = document.getElementById("dropDown").value;

  for (var i = 0; i < savedLayouts.length; i++) {
    if (dropDownValue == savedLayouts[i].layoutName) {
      //append clones to dom
      //if document.getElementById(savedLayouts[0].cellx) != null, do append
      if (document.getElementById(savedLayouts[0].cell1) != null) {
        //get image
        var image1 = document.getElementById(savedLayouts[i].cell1);
        //clone image
        var cloneImg1 = image1.cloneNode(true);
        //append to DOM
        document.getElementById("div1").appendChild(cloneImg1);
      }

      if (document.getElementById(savedLayouts[0].cell2) != null) {
        var image2 = document.getElementById(savedLayouts[i].cell2);
        var cloneImg2 = image2.cloneNode(true);
        document.getElementById("div2").appendChild(cloneImg2);
      }

      if (document.getElementById(savedLayouts[0].cell3) != null) {
        var image3 = document.getElementById(savedLayouts[i].cell3);
        var cloneImg3 = image3.cloneNode(true);
        document.getElementById("div3").appendChild(cloneImg3);
      }
    }
  }
}

/**************************/
/********SPLIT DIVS********/
/**************************/
/*we need variables to keep track of splits; this way we can allow multiple splits while allowing the user to switch from vertical to horizontal and vice versa; this sort of acts like a "marker"; the reason we need this is so that we can clear the div and make way for a new split, either hor or vert*/
var vertSplit = 0;
var horSplit = 0;
var currentDiv;

function chooseDiv() {
  currentDiv;

  var dropDownValue = document.getElementById("selectCell").value;

  if (dropDownValue === "cell1") {
    currentDiv = "div1";
  } else if (dropDownValue === "cell2") {
    currentDiv = "div2";
  } else {
    currentDiv = "div3";
  }
}

function unSplit() {
  chooseDiv();
  document.getElementById(currentDiv).innerHTML = "";
  //when we unsplit the cell, we want to re-append the original image back on their
  //we need to figure out if the current selected cell is split or not; we might want to use the vertSplit and horSplit values to do this
}

function splitVertical() {
  // alert("you pressed the split vert btn");
  chooseDiv();
  vertSplit++;
  //clear the html before creating the inner divs
  /*if no clear is done, divs will stack vertically each time user clicks on a split button*/
  if (horSplit > 0) {
    document.getElementById(currentDiv).innerHTML = "";
  }

  //create new divs
  var leftVertDiv = document.createElement("div");
  var rightVertDiv = document.createElement("div");
  //style divs
  leftVertDiv.style.cssText = "width: 60px; height: 120px; border: 1px solid black";
  rightVertDiv.style.cssText = "width: 60px; height: 120px; border: 1px solid black";

  /*gives a side by side look for the inner divs*/
  leftVertDiv.style.display = "inline-block";
  /*removes space between the two inner divs; the small space is a result of using inline-block display*/
  leftVertDiv.style.display = "table-cell";
  rightVertDiv.style.display = "inline-block";
  rightVertDiv.style.display = "table-cell";

  //append div to dom
  document.getElementById(currentDiv).appendChild(leftVertDiv);
  document.getElementById(currentDiv).appendChild(rightVertDiv);
  horSplit = 0;
}

function splitHorizontal() {
  chooseDiv();
  horSplit++;
  if (vertSplit > 0) {
    document.getElementById(currentDiv).innerHTML = "";
  }
  //create new divs
  var topHorDiv = document.createElement("div");
  var bottomHorDiv = document.createElement("div");
  //style divs
  topHorDiv.style.cssText = "width: 120px; height: 60px; border: 1px solid black";
  bottomHorDiv.style.cssText = "width: 120px; height: 60px; border: 1px solid black";

  // topHorDiv.style.display = "inline-block";
  // topHorDiv.style.display = "table-cell";
  // bottomHorDiv.style.display = "inline-block";
  // bottomHorDiv.style.display = "table-cell";

  //append divs to dom
  document.getElementById(currentDiv).appendChild(topHorDiv);
  document.getElementById(currentDiv).appendChild(bottomHorDiv);
  vertSplit = 0;
}



//Issue 1
/***********************************/
/*swap layout divs on drag and drop*/
/***********************************/
//code not swapping divs but is allowing drop
//we need to get the div we are dragging from
// var originalDiv = cloneImg;
//we need to assign our target drop
// var targetDiv = ev.currentTarget.firstElementChild;
//replace the targetDiv with the data (i.e. originalDiv with the image)
// ev.currentTarget.replaceChild(cloneImg, targetDiv);
// originalDiv.appendChild(cloneImg);

//Issue 2
/*when user drops image from pallet onto layout, say cell1, and the user drops another image on top of cell1, that image will appear in cell3, regardless of whether cell2 or cell3 are occupied or not, if the user 1) saves the current layout (after doing the 2nd drop on cell1), and 2) loads the layout; don't know why this is happening; try looking at drop function*/