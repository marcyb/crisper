window.onload = function() {

	var dropZones = ['given', 'when', 'then'];
	var counts = {given:0, when:0, then:0};
	var dragged_items = [];

	function listItemDragStartListener(ev) {
		ev.dataTransfer.effectAllowed = 'move';
		ev.dataTransfer.setData("text", ev.target.id);
		ev.target.className = "dragging";
	}

	function dropZoneDropListener(ev) {
		if (ev.preventDefault) ev.preventDefault(); 
  	if (ev.stopPropagation) ev.stopPropagation(); 

  	ev.target.className = "drop-target";

  	if (ev.target.nodeName == 'UL' && dragged_items.indexOf(ev.dataTransfer.getData('text')) < 0) {
  		var name = ev.target.id.replace("drop-target-", "");
			ev.target.className = "drop-target";
			var dragged = document.getElementById(ev.dataTransfer.getData('text'));
			var copy = dragged.cloneNode(true);
			copy.setAttribute("data-id", copy.id);
			copy.id = name + counts[name]++;
			copy.removeAttribute("class");
			ev.target.appendChild(copy);
			dragged_items.push(copy.getAttribute("data-id"));
			dragged.parentNode.removeChild(dragged);
		};

		return false;		
	}

	var dragElements = document.querySelectorAll('#gherkin li');

	for (var i = 0; i < dragElements.length; i++) {

		dragElements[i].id = "dragElement" + i;
		dragElements[i].className = "draggable";

		dragElements[i].addEventListener('dragstart', function(e) {
			listItemDragStartListener(e);
		});

		dragElements[i].addEventListener('dragend', function(e) {
			e.target.className = "draggable";
		});
	};

	for (zone in dropZones) {
		var z = document.querySelector("#drop-target-" + dropZones[zone]);

		z.addEventListener('dragover', function(e) {
			if (e.preventDefault) {
				e.preventDefault();
			}
			e.dataTransfer.dropEffect = 'move';
			return false;
		});

		z.addEventListener('dragenter', function(e) {
			this.className = "drop-target over";
		});

		z.addEventListener('dragleave', function(e) {
			this.className = "drop-target";
		});

		z.addEventListener('drop', function(e) {
			dropZoneDropListener(e);
		});
	}

// var elements = document.querySelectorAll('[id^=when]');

};
