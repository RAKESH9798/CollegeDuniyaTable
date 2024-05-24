let colleges = [];
let displayCount = 10;
let filteredColleges = [];

fetch('dummy.json')
    .then(response => response.json())
    .then(data => {
        colleges = data;
        filteredColleges = colleges.slice();
        displayFilteredTable();
    });

function displayFilteredTable() {
    const tbody = document.getElementById('college-table-body');
    tbody.innerHTML = '';
    for (let i = 0; i < displayCount && i < filteredColleges.length; i++) {
        const college = filteredColleges[i];
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>#${i+1}</td>
            <td class="text">${college.name}</td>
            <td class="text">${college.fees}</td>
            <td class="text">${college.placement}</td>
            <td>${college.review}/10</td>
            <td>${college.ranking}/${colleges.length}</td>
        `;
        tbody.appendChild(row);
    }
}

function filterTable() {
    const filterType = document.getElementById('filter-type').value;
    const filterValue = document.getElementById('filter-value').value.toLowerCase();

    filteredColleges = colleges.filter(college => {
        if (filterValue === "") {
            return true;
        }
        switch (filterType) {
            case 'name':
                return college.name.toLowerCase().includes(filterValue);
            case 'ranking':
                return parseInt(college.ranking) == parseInt(filterValue);
            case 'fees':
                const feesNumeric = parseFloat(college.fees.replace(/[\$,]/g, ''));
                const filterNumeric = parseFloat(filterValue.replace(/[\$,]/g, ''));
                return !isNaN(feesNumeric) && feesNumeric <= filterNumeric;
            case 'review':
                return parseFloat(college.review) >= parseFloat(filterValue);
            default:
                return true;
        }
    });

    displayCount = 10;
    displayFilteredTable();
}

document.getElementById('filter-value').addEventListener('input', filterTable);

function sortColleges(criteria, order) {
    filteredColleges.sort((a, b) => {
        if (order === 'asc') {
            return a[criteria] > b[criteria] ? 1 : -1;
        } else {
            return a[criteria] < b[criteria] ? 1 : -1;
        }
    });
    displayFilteredTable();
}

window.onscroll = function() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        displayCount += 10;
        displayFilteredTable();
    }
};
