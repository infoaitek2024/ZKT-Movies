const searchResultDiv = document.querySelector(".search_result_div");
const searchBtn = document.querySelector(".search");
const searchHeader = document.getElementById("search_header");
const hamburgerPhone = document.querySelector(".hamburgerphone");
const hamburger = document.querySelector(".hamburger");
const overlaySideNavabar = document.querySelector(".overlay_side_navabar");
const lightDarkmode = document.querySelector(".light_darkmode");
const arrowLeft = document.querySelector(".arrow_left");
const sidenavChildContainer = document.querySelector(".sidenav_child_container");
const numberOFSeasons = document.querySelector(".number_of_seasons");
const EpisodesContainer = document.querySelector(".Episodes_container");
const currentSeason = document.querySelector(".current_season");
const menuulLI = document.querySelectorAll(".menu_ul li");
const titleoftvshow = document.querySelector(".titleoftvshow");
const movieDetailnavContainer = document.querySelector(".movieDetailnavContainer");
const searchbox = document.querySelector(".search");

hamburgerPhone.addEventListener("click", function () {
    sidenavChildContainer.classList.add("sidenav_container_active");
    overlaySideNavabar.classList.add("sidenav_container_active");
    hamburgerPhone.classList.add("hamburgerphonedeactive");
});

overlaySideNavabar.addEventListener("click", function () {
    sidenavChildContainer.classList.remove("sidenav_container_active");
    overlaySideNavabar.classList.remove("sidenav_container_active");
    document.body.classList.remove("minimize_siderbar");
    hamburgerPhone.classList.remove("hamburgerphonedeactive");
});






window.addEventListener("scroll", function () {
    let intiCon = titleoftvshow.getBoundingClientRect();
    if (window.scrollY > intiCon.height) {
        movieDetailnavContainer.classList.add("bgadd");
    } else {
        movieDetailnavContainer.classList.remove("bgadd");
    }
});




arrowLeft.addEventListener("click", function () {
    document.body.classList.remove("minimize_siderbar");
});



lightDarkmode.addEventListener("click", function () {
    document.body.classList.toggle("light");
    if (document.body.classList.contains('light')) {
        localStorage.setItem('theme', 'light')
    }
    else {
        localStorage.setItem('theme', 'dark')
    }
});


hamburger.addEventListener("click", function () {
    document.body.classList.add("minimize_siderbar");
});


function settheme() {
    let currtheme = localStorage.getItem('theme')
    if (currtheme == 'light') {
        document.body.classList.add('light')
    }
    else {
        document.body.classList.remove('light')
    }
}

settheme()

menuulLI.forEach(item => {
    item.addEventListener('click', function () {
        menuulLI.forEach(i => i.classList.remove('hovered'))
        item.classList.add('hovered');
    })

})
menuulLI[2].classList.add('hovered');


const myApi = "6b2dec73b6697866a50cdaef60ccffcb";



let url = document.location.href;
let fetcid = url.slice(url.indexOf("=") + 1);
let numberOfSeason = Number(url.slice(url.indexOf("Z") + 1, url.indexOf("-")));



const seasonsnoFun = function () {
    let seasonhtml = "";
    for (let i = 1; i < numberOfSeason + 1; i++) {
        seasonhtml += `<li class="season">${i}</li>`
    }

    return ` <ol class="seasonul">${seasonhtml}
</ol>`
}
numberOFSeasons.innerHTML = seasonsnoFun();
const Seseason = document.querySelectorAll('.season')
Seseason[0].classList.add('seasonBtnactive')

numberOFSeasons.addEventListener('click', function (e) {
    let element = e.target;
    if (element.classList.contains('season')) {
        const Seseason = document.querySelectorAll('.season')
        Seseason.forEach(i => i.classList.remove('seasonBtnactive'));
        element.classList.add('seasonBtnactive');
        EpisodesContainer.innerHTML = " ";
        seasonnumfun(element.innerText);
    }
})






const CurrTvshow = async (id) => {
    const res = await fetch(
        `https://api.themoviedb.org/3/tv/${id}?api_key=${myApi}`);
    const data = await res.json();
    return data;

};

const CurrEpisode = async (tv_id, currSea, currEpiso) => {
    let episohtml
    const res = await fetch(
        `https://api.themoviedb.org/3/tv/${tv_id}/season/${currSea}/episode/${currEpiso}?api_key=6b2dec73b6697866a50cdaef60ccffcb`);
    const data = await res.json();
    episohtml = episodefun(data)
    EpisodesContainer.insertAdjacentHTML("beforeend", episohtml)
};






const episodefun = function (currepsh) {
    return `<div class="epishodes_card">
    <a href=" https://www.2embed.ru/embed/tmdb/tv?id=${fetcid}&s=${currepsh.season_number}&e=${currepsh.episode_number}"><img class="episode_image"
            src="https://image.tmdb.org/t/p/w500/${currepsh.still_path}" alt="${currepsh.name}">
            <span class="runtime">${timeCon(currepsh.runtime)}</span>
        <div class="playsvg_container"><img class="playsvg" src="./resources/play-circle-fill.svg"
                alt=""></div>
    </a>
    <div class="episode_detail">
        <h2 class="episode_title"> <span class="episodenumm">${currepsh.episode_number}.</span> ${currepsh.name}</h2>
        <p class="episode_description">${currepsh.overview}</p>
    </div>
</div>`
}






const timeCon = function (oldtime) {
    let newtime = "";
    if (oldtime > 60 && oldtime < 120) {
        let time = oldtime - 60;

        if (time < 10) {
            newtime = `1:0${time}:00`
        }
        else {
            newtime = `1:${time}:00`
        }

        return newtime;
    }
    if (oldtime > 120) {
        let time = Math.floor(oldtime / 60);
        if (time < 10) {
            newtime = `2:0${time}:00`
        }
        else {
            newtime = `2:${time}:00`
        }
        return newtime;

    }

    if (oldtime == 0 || oldtime == null) {
        newtime = ""
        return newtime;
    }

    if (oldtime <= 60) {
        newtime = `${oldtime}:00`
        return newtime;
    }


}





const seasonnumfun = function (seasoncc) {
    EpisodesContainer.innerHTML = " ";
    CurrTvshow(fetcid).then((dat) => {
        titleoftvshow.innerText = dat.name;
        let numseasons = dat.seasons;
        const currsea = function (seasonNO) {
            numseasons.forEach(item => {
                if (seasonNO == item.season_number) {
                    currentSeason.innerText = `Season ${seasonNO}`;
                    let numOfEpisodes = item.episode_count;
                    for (i = 1; i < numOfEpisodes + 1; i++) {
                        CurrEpisode(fetcid, seasonNO, i);

                    }
                }

            })
        }
        currsea(seasoncc)
    });
};


seasonnumfun(1);






searchbox.addEventListener('click', function () {
    location.replace("./search.html")
})