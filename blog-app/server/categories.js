const categories = {
    "Music": {
        "createDate":"08/12/2022",
        "updateDate":"08/12/2022"
    }
};

function addNewCategory(categoryName, createDate, updateDate) {
    categories[categoryName] = {createDate, updateDate}; 
};

function getAllCategories() {
    return categories;
}

module.exports = {
    addNewCategory,
    getAllCategories
};