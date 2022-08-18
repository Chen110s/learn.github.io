var header = document.querySelector('header');
var section = document.querySelector('section');

// 加载JSON  
// 1.用一个变量存储将访问的 URL 
var requestURL = 'https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json';
// 2.创建一个HTTP请求对象
var request = new XMLHttpRequest();

// 3.打开请求, 指定http方法和请求地址
request.open('GET', requestURL);

// 4.请求对象的responseType属性指定响应数据类型
request.responseType = 'json';
request.send();


// 5.获取JSON数据
request.onload = function() {
    var superHeroes = request.response; //保存我们请求的数据
    populateHeader(superHeroes); //使用数据
    showHeroes(superHeroes);
}

// 6.编写使用的函数
function populateHeader(jsonObj) { // 创建，设置内容，追加到 <header>。
    var myH1 = document.createElement('h1');
    myH1.textContent = jsonObj['squadName'];
    header.appendChild(myH1);

    var myPara = document.createElement('p');
    myPara.textContent = 'Hometown: ' + jsonObj['homeTown'] + ' // Formed: ' + jsonObj['formed'];
    header.appendChild(myPara);
}

function showHeroes(jsonObj) {
    var heroes = jsonObj['members'];

    for (i = 0; i < heroes.length; i++) {
        var myArticle = document.createElement('article');
        var myH2 = document.createElement('h2');
        var myPara1 = document.createElement('p');
        var myPara2 = document.createElement('p');
        var myPara3 = document.createElement('p');
        var myList = document.createElement('ul');

        myH2.textContent = heroes[i].name;
        myPara1.textContent = 'Secret identity: ' + heroes[i].secretIdentity;
        myPara2.textContent = 'Age: ' + heroes[i].age;
        myPara3.textContent = 'Superpowers:';

        var superPowers = heroes[i].powers;
        for (j = 0; j < superPowers.length; j++) {
            var listItem = document.createElement('li');
            listItem.textContent = superPowers[j];
            myList.appendChild(listItem);
        }

        myArticle.appendChild(myH2);
        myArticle.appendChild(myPara1);
        myArticle.appendChild(myPara2);
        myArticle.appendChild(myPara3);
        myArticle.appendChild(myList);

        section.appendChild(myArticle);
    }
}