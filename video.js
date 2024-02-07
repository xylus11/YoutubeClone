
// 2. This code loads the IFrame Player API code asynchronously.
const search = window.location.search;
const params = new URLSearchParams(search);
const video = params.get('videoId');

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '520',
    width: '920',
    videoId: video,
    playerVars: {
      'playsinline': 1
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }


  },
  videoDetails(),
  recommended(),
 
  );
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = true;
  }
}
function stopVideo() {
  player.stopVideo();
}





function timeSince(timestamp) {
  const seconds = Math.floor((new Date() - new Date(timestamp)) / 1000);
  let interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
      return interval + " years ago";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
      return interval + " months ago";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
      return interval + " days ago";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
      return interval + " hours ago";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
      return interval + " minutes ago";
  }
  return Math.floor(seconds) + " seconds ago";
}

function formatViews(views) {
  if (views >= 1000000) {
      return (views / 1000000).toFixed(1) + 'M ';
  } else if (views >= 1000) {
      return (views / 1000).toFixed(1) + 'K ';
  } else {
      return views.toString();
  }
}
// Example usage:
 // Output: e.g., "3 months ago"



// const main_contain = document.createElement('div');
// const video_container = document.createElement('div');

// const video_desc     = document.createElement('div');
// const profile_pic    = document.createElement('div');

// const img=   document.createElement('img');
// const  title = document.createElement('div')

// img.src= image;
// video_desc.innerHTML=`<h4>${video.title}</h4>
//                        <h5> ${video.channelTitle} </h5>
//                        <span> ${total_views}views </span><span id='dot'>.</span> <span>${ video.publishedText} </span>
//                     `;
// profile_pic.innerHTML=`<img  src=${video.channelThumbnail[0].url}  />`


// title.append(profile_pic);
// title.append(video_desc);
// video_container.append(img);

// const anchorTag = document.createElement('a');
// // Setting the href attribute to the video URL
// anchorTag.href = `video.html?videoId=${video.videoId}`;
// // Appending the video container to the anchor tag
// anchorTag.append(video_container);
// // Appending the title to the anchor tag (optional)
// anchorTag.append(title);


async function related()
{
  const url = `https://youtube-v31.p.rapidapi.com/search?relatedToVideoId=${video}&part=id%2Csnippet&type=video&maxResults=5`;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '6326138db5mshe409df4d63eb5efp14efebjsn912cb6954cde',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};
try {
	const response = await fetch(url, options);
	const result = await response.text();
} catch (error) {
	console.error(error);
}
}

const container = document.getElementById('channel-description');

//video details
async function videoDetails()
{
const url = `https://youtube-v31.p.rapidapi.com/videos?part=contentDetails%2Csnippet%2Cstatistics&id=${video}`;

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '6326138db5mshe409df4d63eb5efp14efebjsn912cb6954cde',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();


  const videoData=result.items[0].snippet;
const contentDetails = result.items[0].contentDetails;
const statistics = result.items[0].statistics;

// // Extracted fields
const channelId= videoData.channelId;
const title = videoData.title;
const publishedAt = videoData.publishedAt;
const channelTitle = videoData.channelTitle;
const description = videoData.description;
const viewCount = statistics.viewCount;
const likeCount = statistics.likeCount;
const commentCount = statistics.commentCount;

console.log("Title:", title);
console.log("Published At:", publishedAt);
console.log("Channel Title:", channelTitle);
console.log("Description:", description);
console.log("View Count:", viewCount);
console.log("Like Count:", likeCount);
console.log("Comment Count:", commentCount);


const videoTitle = document.createElement('div');

videoTitle.innerHTML=`<p>${title} </p>`;
videoTitle.style.fontWeight='900';
const channelDetails     = document.createElement('div');
channelDetails.innerHTML= `<div id ='channelPhoto'><div id='channeProfilePic'></div><div id='context'><div>${channelTitle}</div> <div id="subcount"></div> </div><button type='button'><span class="material-symbols-outlined">
notifications
</span>Subscribe<span class="material-symbols-outlined">
expand_more
</span></button>
<div id='ico'>
<span class="material-symbols-outlined ">
thumb_up
</span>
<span>${formatViews(likeCount)}</span>
<span class="material-symbols-outlined">
thumb_down
</span>
<span class="material-symbols-outlined">
download_2
</span>



</div>
`;
const videoDescription    = document.createElement('div');
videoDescription.setAttribute('id','description');

videoDescription.innerHTML=`<h5>${formatViews(viewCount)} views ${timeSince(publishedAt) }</h5><p>${description} </p>`
const total_comments=     document.createElement('div');
total_comments.innerHTML=`<div style='display:flex; gap:20px;'><h3>${formatViews(commentCount)} Comments</h3> <span class="material-symbols-outlined">
sort
</span> Sort by</div>`

 const userComments = document.createElement('div');
 userComments.setAttribute('id','comment');


container.append(videoTitle);
container.append(channelDetails);
container.append(videoDescription);
container.append(total_comments);
container.append(userComments);

channelDesc(channelId)
videoComments();
 



} catch (error) {
	console.error(error);
}
}


// function display_channel_info()
// {
//  const main_contain = document.createElement('div');


//  const videoDescription    = document.createElement('div');
//  const videoCategory    = document.createElement('div');
//  const videoComments=     document.createElement('div');
//  videoTitle.innerHTML=`<p>${details.title}</p>`
// //  container.append(details.title);


// // const img=   document.createElement('img');
// // const  title = document.createElement('div')
// }













async function channelDesc(chanId)
{
  const url = `https://youtube-v31.p.rapidapi.com/channels?part=snippet%2Cstatistics&id=${chanId}`;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '6326138db5mshe409df4d63eb5efp14efebjsn912cb6954cde',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
	console.log(typeof result);
  const channeProfilePic = result.items[0].snippet.thumbnails.default.url;
  const dp = document.getElementById('channeProfilePic');
  const subb= document.getElementById('subcount')
  const subCount = result.items[0].statistics.subscriberCount;
  function formatSub(count) {
    if (count >= 1000000) {
        return (count / 1000000).toFixed(1) + 'M ';
    } else if (count >= 1000) {
        return (count / 1000).toFixed(1) + 'K ';
    } else {
        return count.toString();
    }
}

  subb.innerHTML=`<span>${formatSub(subCount)} </span>`
  dp.innerHTML=`<img src="${channeProfilePic}" />`

 
} catch (error) {
	console.error(error);
}
}

async function videoComments(){
// video comments
const url = `https://youtube-v31.p.rapidapi.com/commentThreads?part=snippet&videoId=${video}&maxResults=5`;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '6326138db5mshe409df4d63eb5efp14efebjsn912cb6954cde',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
   const res = JSON.parse(result);
   const item = res.items;
   item.forEach(comment=>{
    const user_profile=comment.snippet.topLevelComment.snippet.authorProfileImageUrl;
      
   const user_name =comment.snippet.topLevelComment.snippet.authorDisplayName;

   const date =comment.snippet.topLevelComment.snippet.publishedAt;
  const liked_by =comment.snippet.topLevelComment.snippet.likeCount;
  const text =

  comment.snippet.topLevelComment.snippet.textDisplay;


    const displayComment = document.createElement('div');
    displayComment.innerHTML=`<img src='${user_profile}'/> <div><div> <h5>${user_name} ${timeSince(date)}</h5></div>
    <div>
     <p>${text}</p>
    <span class="material-symbols-outlined">
    thumb_up
    </span><span id='like'>${liked_by}</span> <span class="material-symbols-outlined">
    thumb_down
    </span></div></div> `;
    displayComment.setAttribute('id','box')
    const com = document.getElementById('comment');
    com.append(displayComment);
   })
} catch (error) {
	console.error(error);
}
}



const recom = document.getElementById('related-videos');


async function recommended()
{
const url = `https://youtube-v3-alternative.p.rapidapi.com/related?id=${video}&geo=US&lang=en`;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '6326138db5mshe409df4d63eb5efp14efebjsn912cb6954cde',
		'X-RapidAPI-Host': 'youtube-v3-alternative.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	const res = JSON.parse(result);
  res.data.forEach(video=>{
    console.log(video);
    const chtitle =video.channelTitle;
    const vidtitle= video.title
      const length= video.lengthText
      const views= video.viewCount
      const published = video.publishedTimeText;
    const url= video.thumbnail[0].url;
    const link= video.videoId;

    const rel = document.createElement('div');
    rel.setAttribute('id','related')
    rel.innerHTML=`<a style=display:flex; href ='video.html?videoId=${link}'><img src='${url}'/>
    <div><div><h4>${vidtitle}<h4><h5>${chtitle}</h5></div>
    <span id='like'>${formatViews(views)} views  <span>${published}<span></span> </div> </a>`
    recom.append(rel);

    
   

  })
} catch (error) {
	console.error(error);
}
}


