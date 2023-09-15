let vidList = document.querySelector(".videoList");
let key = "AIzaSyAvXtQ9OXbUTwyFysCAVztVXJzBoE8BwDY";
let playlistId = "PLPqLzl0nlhpSnbR8TrBuN93qfef0iiMgH";
const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlistId}`;

fetch(url)
    .then((data) => {
        return data.json();
    })
    .then((json) => {
        let items = json.items;
        let result = '';
        items.map((el) => {

            let title = el.snippet.title;
            if(title.length > 50){
                title = title.substr(0, 50) + "...";
            }

            let des = el.snippet.description
            if(des.length > 100){
                des = des.substr(0, 100) + "...";
            }

            result += `
                <article>
                    <a href="${el.snippet.resourceId.videoId}" class="pic">
                        <img src="${el.snippet.thumbnails.medium.url}">
                    </a>

                    <div class="con">
                        <h2>${title}</h2>
                        <p>${des}</p>
                        <span>${date}</span>
                    </div>
                </article>
            `;
        })
        vidList.innerHTML = result;
    })

    //a태그인 썸네일을 클릭하면 비디오가 팝업되서 보이게

    vidList.addEventListener("click", (e) => {

        e.preventDefault();

        /* 이벤트 위임의 단점인 이벤트 범위가 커져서 부작용이 발생하는데 
        해결방은으로 이벤트 발생의 목표가 아니라면 return으로 방지하도록 */
        if (!e.target.closest("a")) return;
       
        const vidId = e.target.closest("article").querySelector("a").getAttribute("href");

     

        let pop = document.createElement("figure");
        pop.classList.add("pop");

        pop.innerHTML = `
            <iframe src="https://www.youtube.com/embed/${vidId}" frameborder = "0" width="100%" height="100%" allowfullscreen></iframe>
            <span class="btnClose">close</span>
        `;
        vidList.append(pop);
    });

    //팝업창의 close버튼도 동적으로 생성된 버튼으로
    //이벤트 위힘으로 구현해야 합니다

    vidList.addEventListener("click", (e) => {
        const pop = vidList.querySelector(".pop");
        //pop이 존재하면 밑에 if문으로 코드를 시작하고
        //pop이 없으면 무시되어 실행되지 않습니다
        if (pop) {
            const close = pop.querySelector
            ("span");
            if (e.target == close) pop.remove();
            // pop.remove();
        }
    })