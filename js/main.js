var bannerChange = 0;
window.onload = function(){
	// the bannerChange variable is used by clearTimeout to stop the auto running banner change if the user selects it.
	bannerChange = setTimeout(function() {AutoNext(0);}, 2000);

	// This is dummy data to show how actual articles would show up on the web page.
	var jsonObj = {
		date: "May 20, 2015",
		header: "Corporate Announcement",
		img: "http://lorempixel.com/400/200/sports",
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin feugiat sagittis vestibulum. Nunc scelerisque et."
	}
	for (var i = 0; i < 3; i++){
		AddStory(jsonObj);
	}
};

// Loads the next banner title and text while changing which circles at the bottom are visible.
// Is used by both AutoNext and SelectNext.
function Next(currentId){
	var current = document.getElementById("banner" + currentId);
	current.style.opacity = 0;
	current.classList.remove("fadeIn");
	current.classList.add("fadeOut");
	var hide = function(){
		var nextId = (currentId + 1) % 3;
		var next = document.getElementById("banner" + nextId);
		next.style.display = "none";
		next.style.display = "block";
		next.classList.remove("fadeOut");
		next.classList.add("fadeIn");
		next.style.opacity = 1;
		document.getElementById('circle0').style.display = "none";
		document.getElementById('circle1').style.display = "none";
		document.getElementById('circle2').style.display = "none";
		if (nextId != 0)
			document.getElementById('circle0').style.display = "block";
		if (nextId != 1)
			document.getElementById('circle1').style.display = "block";
		if (nextId != 2)
			document.getElementById('circle2').style.display = "block";
	};
	setTimeout(function() {hide();}, 1000);
	
}

// Automatically changes the banner.
function AutoNext(currentId){
	Next(currentId);
	bannerChange = setTimeout(function() { AutoNext((currentId + 1) % 3);}, 4000);
}

// Once the banner is selected by the user it cancels the automatic banner change and waits for the user to change it.
function SelectNext(currentId){
	clearTimeout(bannerChange);
	Next(currentId);
}

// Builds the html for the stories that are visible on the web page.
function AddStory(jsonObj){
	var spacer = document.createElement("div");
	spacer.classList.add("spacer");
	var news = document.createElement("div");
	news.classList.add("news");
	var date = document.createElement("h1");
	date.classList.add("date");
	date.innerHTML = jsonObj.date;
	var header = document.createElement("h4");
	header.classList.add("newsHeader");
	header.innerHTML = jsonObj.header;
	var img = document.createElement("img");
	img.classList.add("newsImg");
	img.src = jsonObj.img;
	var text = document.createElement("p");
	text.innerHTML = jsonObj.text;
	var readMore = document.createElement("a");
	readMore.innerHTML = "Read More";
	readMore.href = "#";
	readMore.style.display = "block";
	news.appendChild(date);
	news.appendChild(header);
	news.appendChild(img);
	news.appendChild(text);
	spacer.appendChild(news);
	spacer.appendChild(readMore);
	document.getElementById("newsContainer").appendChild(spacer);	
}
