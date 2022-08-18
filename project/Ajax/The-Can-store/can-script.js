//使用fetch来获取产品并将它们传递给init  
//报告所有在获取操作中发生的错误  
//一旦产品被成功加载并格式化为JSON对象  
//使用response.json()，运行initialize()函数  
fetch('products.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
    })
    .then(json => initialize(json))
    .catch(err => console.error(`Fetch problem: ${err.message}`));

//设置应用程序逻辑，声明所需的变量，包含所有其他函数
function initialize(products) {
    // 抓住我们需要操作的UI元素
    const category = document.querySelector('#category');
    const searchTerm = document.querySelector('#searchTerm');
    const searchBtn = document.querySelector('button');
    const main = document.querySelector('main');

    // 记录最后输入的类别和搜索词  
    let lastCategory = category.value;
    // 目前还没有进行任何搜索
    let lastSearch = '';

    //这些包含按类别和搜索词过滤的结果  
    // finalGroup将包含需要在之后显示的产品  
    //搜索已经完成。 每个都是一个包含对象的数组。  
    //每个对象代表一个产品  
    let categoryGroup;
    let finalGroup;

    //首先，设置finalGroup等于整个产品数据库  
    //然后运行updateDisplay()，这样所有产品都是最初显示的。      
    finalGroup = products;
    updateDisplay();

    //设置两个等于空数组，在搜索运行的时间  
    categoryGroup = [];
    finalGroup = [];

    //当点击搜索按钮时，调用selectCategory()来启动  
    //搜索选择我们想要显示的产品类别  
    searchBtn.addEventListener('click', selectCategory);

    function selectCategory(e) {
        //使用preventDefault()来停止表单提交-那会破坏  
        //经验
        e.preventDefault();

        //将这些设置为空数组，清除之前的搜索  
        categoryGroup = [];
        finalGroup = [];

        //如果category和搜索词是相同的，它们是最后一次  
        //搜索被运行，结果将是相同的，所以没有运行点  
        //再一次-只是返回出函数  
        if (category.value === lastCategory && searchTerm.value.trim() === lastSearch) {
            return;
        } else {
            //更新最后一个类别和搜索词的记录  
            lastCategory = category.value;
            lastSearch = searchTerm.value.trim();
            // In this case we want to select all products, then filter them by the search
            // term, so we just set categoryGroup to the entire JSON object, then run selectProducts()
            if (category.value === 'All') {
                categoryGroup = products;
                selectProducts();
                // If a specific category is chosen, we need to filter out the products not in that
                // category, then put the remaining products inside categoryGroup, before running
                // selectProducts()
            } else {
                // the values in the <option> elements are uppercase, whereas the categories
                // store in the JSON (under "type") are lowercase. We therefore need to convert
                // to lower case before we do a comparison
                const lowerCaseType = category.value.toLowerCase();
                // Filter categoryGroup to contain only products whose type includes the category
                categoryGroup = products.filter(product => product.type === lowerCaseType);

                // Run selectProducts() after the filtering has been done
                selectProducts();
            }
        }
    }

    // selectProducts() Takes the group of products selected by selectCategory(), and further
    // filters them by the tiered search term (if one has been entered)
    function selectProducts() {
        // If no search term has been entered, just make the finalGroup array equal to the categoryGroup
        // array — we don't want to filter the products further.
        if (searchTerm.value.trim() === '') {
            finalGroup = categoryGroup;
        } else {
            // Make sure the search term is converted to lower case before comparison. We've kept the
            // product names all lower case to keep things simple
            const lowerCaseSearchTerm = searchTerm.value.trim().toLowerCase();
            // Filter finalGroup to contain only products whose name includes the search term
            finalGroup = categoryGroup.filter(product => product.name.includes(lowerCaseSearchTerm));
        }
        // Once we have the final group, update the display
        updateDisplay();
    }

    // start the process of updating the display with the new set of products
    function updateDisplay() {
        // remove the previous contents of the <main> element
        while (main.firstChild) {
            main.removeChild(main.firstChild);
        }

        // if no products match the search term, display a "No results to display" message
        if (finalGroup.length === 0) {
            const para = document.createElement('p');
            para.textContent = 'No results to display!';
            main.appendChild(para);
            // for each product we want to display, pass its product object to fetchBlob()
        } else {
            for (const product of finalGroup) {
                fetchBlob(product);
            }
        }
    }

    // fetchBlob uses fetch to retrieve the image for that product, and then sends the
    // resulting image display URL and product object on to showProduct() to finally
    // display it
    function fetchBlob(product) {
        // construct the URL path to the image file from the product.image property
        const url = `images/${product.image}`;
        // Use fetch to fetch the image, and convert the resulting response to a blob
        // Again, if any errors occur we report them in the console.
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }
                return response.blob();
            })
            .then(blob => showProduct(blob, product))
            .catch(err => console.error(`Fetch problem: ${err.message}`));
    }

    // Display a product inside the <main> element
    function showProduct(blob, product) {
        // Convert the blob to an object URL — this is basically an temporary internal URL
        // that points to an object stored inside the browser
        const objectURL = URL.createObjectURL(blob);
        // create <section>, <h2>, <p>, and <img> elements
        const section = document.createElement('section');
        const heading = document.createElement('h2');
        const para = document.createElement('p');
        const image = document.createElement('img');

        // give the <section> a classname equal to the product "type" property so it will display the correct icon
        section.setAttribute('class', product.type);

        // Give the <h2> textContent equal to the product "name" property, but with the first character
        // replaced with the uppercase version of the first character
        heading.textContent = product.name.replace(product.name.charAt(0), product.name.charAt(0).toUpperCase());

        // Give the <p> textContent equal to the product "price" property, with a $ sign in front
        // toFixed(2) is used to fix the price at 2 decimal places, so for example 1.40 is displayed
        // as 1.40, not 1.4.
        para.textContent = `$${product.price.toFixed(2)}`;

        // Set the src of the <img> element to the ObjectURL, and the alt to the product "name" property
        image.src = objectURL;
        image.alt = product.name;

        // append the elements to the DOM as appropriate, to add the product to the UI
        main.appendChild(section);
        section.appendChild(heading);
        section.appendChild(para);
        section.appendChild(image);
    }
}