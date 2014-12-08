window.onload = function() {

	var dropZones = ['given', 'when', 'then'];
	var counts = {given:0, when:0, then:0};
	var dragged_items = [];
	var in_dz = false;

	function unselectedDragStartListener(ev) {
		in_dz = false;
		ev.dataTransfer.effectAllowed = 'move';
		ev.dataTransfer.setData("text", ev.target.id);
		ev.target.className = "dragging";
	}

	function selectedDragStartListener(ev) {
		in_dz = false;
		ev.dataTransfer.effectAllowed = 'move';
		ev.dataTransfer.setData("text", ev.target.id);
		ev.target.className = "dragging";
	}

	function selectedDragEndListener(ev) {
		if (in_dz) {
			ev.target.className = "draggable";
		} else {
			original_id = ev.target.getAttribute("data-id");
			ev.target.parentNode.removeChild(ev.target);
			dragged_items.splice(dragged_items.indexOf(original_id), 1);
			document.getElementById(original_id).style.removeProperty("display");
		}
	}

	function dropZoneDropListener(ev) {
		in_dz = true;
		if (ev.preventDefault) ev.preventDefault(); 
  	if (ev.stopPropagation) ev.stopPropagation(); 

  	if (ev.target.nodeName != 'UL') {
  		return false;
  	}

  	ev.target.className = "drop-target";
  	
  	var dragged_id = ev.dataTransfer.getData('text');

  	var given = dragged_id.indexOf('given') > -1;
  	var when = dragged_id.indexOf('when') > -1;
  	var then = dragged_id.indexOf('then') > -1;

  	if (dragged_items.indexOf(dragged_id) < 0) {
  		var dz_name = ev.target.id.replace("drop-target-", "");

			if ((dz_name === "given" && given) || 
					(dz_name === "when" && when) ||
					(dz_name === "then" && then)) {
				return false;
			}

			var dragged = document.getElementById(dragged_id);
			var copy = dragged.cloneNode(true);
			if (copy.getAttribute("data-id") == null) {
				copy.setAttribute("data-id", copy.id);
				dragged_items.push(copy.getAttribute("data-id"));
				dragged.style.display = "none";
			} else {
				dragged.parentNode.removeChild(dragged);
			}
			copy.id = dz_name + counts[dz_name]++;
			copy.removeAttribute("class");

			copy.ondragend = function(e) {
				selectedDragEndListener(e);
			};

			copy.ondragstart = function(e) {
				selectedDragStartListener(e);
			};

			ev.target.appendChild(copy);
		};
		return false;		
	}

	var dragElements = document.querySelectorAll('#gherkin li');

	for (var i = 0; i < dragElements.length; i++) {

		dragElements[i].id = "dragElement" + i;
		dragElements[i].className = "draggable";

		dragElements[i].addEventListener('dragstart', function(e) {
			unselectedDragStartListener(e);
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
