var bannerChange = 0;
var bannerStates = 0;
window.onload = function(){
	// the bannerChange variable is used by clearTimeout to stop the auto running banner change if the user selects it.
	bannerChange = setTimeout(function() {AutoNext(0);}, 2000);

	// This is dummy data to show how actual articles would show up on the web page.
	var jsonObjStories = {
		date: "May 20, 2015",
		header: "Corporate Announcement",
		img: "http://lorempixel.com/400/200/sports",
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin feugiat sagittis vestibulum. Nunc scelerisque et."
	}
	for (var i = 0; i < 3; i++){
		AddStory(jsonObjStories);
	}
	
	// Dummy data to show how the banner would look.
	var jsonObjBanner = {
		items: [{
			title: "Title 0",
			text: "Text 0"
		},{
			title: "Title 1",
			text: "Text 1"
		},{
			title: "Title 2",
			text: "Text 2"
		}]
	}

	SetBanner(jsonObjBanner);
};

// Loads the next banner title and text while changing which circles at the bottom are visible.
// Is used by both AutoNext and SelectNext.
function Next(currentId){
	var current = document.getElementById("banner" + currentId);
	current.classList.remove("fadeIn");
	current.classList.add("fadeOut");
	var hide = function(){
		var nextId = (currentId + 1) % bannerStates;
		var next = document.getElementById("banner" + nextId);
		current.classList.add("noDisplay");
		next.classList.remove("fadeOut");
		next.classList.add("fadeIn");
		next.classList.remove("noDisplay");
		document.getElementById('circle' + currentId).classList.remove("noDisplay");
		document.getElementById('circle' + nextId).classList.add("noDisplay");
	};
	setTimeout(function() {hide();}, 1000);
	
}

// Automatically changes the banner.
function AutoNext(currentId){
	Next(currentId);
	bannerChange = setTimeout(function() { AutoNext((currentId + 1) % bannerStates);}, 4000);
}

// Once the banner is selected by the user it cancels the automatic banner change and waits for the user to change it.
function SelectNext(currentId){
	clearTimeout(bannerChange);
	Next(currentId);
}

// Builds the html for the stories that are visible on the web page.
function AddStory(jsonObj){
	var spacer = document.createElement("div");
	var header = document.createElement("header");
	header.classList.add("blockDisplay");
	var news = document.createElement("div");
	news.classList.add("news");
	var date = document.createElement("h1");
	date.classList.add("date");
	date.innerHTML = jsonObj.date;
	var title = document.createElement("h4");
	title.classList.add("newsHeader");
	title.innerHTML = jsonObj.header;
	var img = document.createElement("img");
	img.classList.add("newsImg");
	img.src = jsonObj.img;
	var text = document.createElement("p");
	text.innerHTML = jsonObj.text;
	var readMore = document.createElement("a");
	readMore.innerHTML = "Read More";
	readMore.href = "#";
	readMore.classList.add("blockDisplay");
	header.appendChild(date);
	header.appendChild(title);
	news.appendChild(header);
	news.appendChild(img);
	news.appendChild(text);
	news.appendChild(readMore);
	spacer.appendChild(news);
	document.getElementById("newsContainer").appendChild(spacer);	
}

// Builds the html for the banner.  Can be built with any number of banner items.
function SetBanner(jsonObj){
	var svg = document.createElementNS("http://www.w3.org/2000/svg","svg");
	svg.setAttribute("width", 20 + 25 * (jsonObj.items.length - 1) + "px");
	svg.setAttribute("height", "20px");
	svg.style = "position:absolute; top:75%; left:50%; transform: translate(-50%,-50%);";
	bannerStates = jsonObj.items.length;
	for (var i = 0; i < jsonObj.items.length; i++){
		var bannerDiv = document.createElement("div");
		bannerDiv.className = "bannerSlide absoluteLeft";
		bannerDiv.id = "banner" + i;
		bannerDiv.onclick = "SelectNext(" + i + ")";
		if (i != 0)
			bannerDiv.classList.add("noDisplay");
		var bannerTitle = document.createElement("div");
		bannerTitle.innerHTML = jsonObj.items[i].title;
		bannerTitle.className = "bannerText";
		var bannerText = document.createElement("div");
		bannerText.innerHTML = jsonObj.items[i].text;
		bannerText.className = "bannerText";
		bannerDiv.appendChild(bannerTitle);
		bannerDiv.appendChild(bannerText);
		document.getElementById("banner").appendChild(bannerDiv);
		var circle1 = document.createElementNS("http://www.w3.org/2000/svg","circle");
		circle1.style = "opacity:1;fill:#ffffff;fill-opacity:0;stroke:#ffffff;stroke-width:2;stroke-opacity:1;";
		circle1.setAttribute("cx", 10 + (25 * i));
		circle1.setAttribute("cy", 10);
		circle1.setAttribute("r", 8);
		var circle2 = document.createElementNS("http://www.w3.org/2000/svg","circle");
		circle2.id = "circle" + i;
		circle2.style = "opacity:1;fill:#ffffff;fill-opacity:1;stroke:#ffffff;stroke-width:2;stroke-opacity:1;";
		circle2.setAttribute("cx", 10 + (25 * i));
		circle2.setAttribute("cy", 10);
		circle2.setAttribute("r", 8);
		svg.appendChild(circle1);
		svg.appendChild(circle2);
	}
	document.getElementById("banner").appendChild(svg);
	if (jsonObj.items.length > 0){
		document.getElementById("circle0").classList.add("noDisplay");
	}
}
