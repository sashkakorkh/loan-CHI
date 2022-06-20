var loans;
var investedId;
var loanHtml = "<div class=\"row loan-block\">\n" +
    "        <div class=\"col-sm-6 loan-border\">\n" +
    "            <div class=\"row loan\">\n" +
    "                <div class=\"col-sm\">\n" +
    "                    <div class=\"row\">\n" +
    "                    </div>\n" +
    "                    <div class=\"row\">\n" +
    "                        <h5 class=\"font-weight-bold\">:main-page-loan-name</h5>\n" +
    "                    </div>\n" +
    "                    <div class=\"row loan-details\">\n" +
    "                        <h6>trache: :main-page-trache-value</h6>\n" +
    "                    </div>\n" +
    "                    <div class=\"row loan-details\">\n" +
    "                        <h6>available: :main-page-available-value</h6>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"col-sm\">\n" +
    "                    <div class=\"row justify-content-end\">\n" +
    "                        <span class=\"font-weight-bold text-success invested d\">Invested</span>\n" +
    "                    </div>\n" +
    "                    <div class=\"row justify-content-end  \" data-toggle=\"modal\" data-target=\"#exampleModal\" data-title=\":main-page-loan-title\"  data-available=\":available-to-pop-up\" data-term=\":term_remaining\"  data-loan-id=\":main-page-loan-id\">" +
    "                        <button type=\"button\" class=\"btn btn-warning text-uppercase\">Invest</button>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>"

if (loans == null) {
    loans = parse()
}

renderMainPage();
setPopUp();
setFromPopUp();

function setVisibleInvested(i) {
    if (i === parseInt(investedId)) {
        document.getElementsByClassName('invested')[i].style.visibility = 'visible';
    }
}

function replaceLoansBlock(rowElement, availableCount) {
    for (let i = 0; i < loans.length; i++) {
        var temp = loanHtml;
        temp = temp.replace(':main-page-loan-id', i.toString());
        temp = temp.replace(':main-page-loan-name', loans[i].title);
        temp = temp.replace(':main-page-trache-value', loans[i].tranche);
        temp = temp.replace(':main-page-available-value', loans[i].available);
        temp = temp.replaceAll(':main-page-loan-title', loans[i].title);
        temp = temp.replaceAll(':available-to-pop-up', loans[i].available);
        temp = temp.replaceAll(':term_remaining', loans[i].term_remaining);
        rowElement.insertAdjacentHTML('beforeend', temp);
        availableCount += parseInt(loans[i].available.replace(',', ''));
        setVisibleInvested(i);
    }
    return availableCount;
}

function renderMainPage() {
    removeElementsByClass('loan-block')
    var rowElement = document.getElementById("row");
    var avalibleCount = 0;
    avalibleCount = replaceLoansBlock(rowElement, avalibleCount);
    var elementById = document.getElementById("amount");
    elementById.innerHTML = addComma(avalibleCount.toString())
}

function removeElementsByClass(className) {
    const elements = document.getElementsByClassName(className);
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }
}

function getMounthAndDay(mounts, endResult, day) {
    if (mounts > 0) {
        ``
        endResult += mounts + " months ";
    }
    if (day > 0) {
        endResult += day + " days";
    }
    return endResult;
}

function getMounts(endsSecond) {
    return parseInt(endsSecond / (60  * 24 * 30 ));
}

function getDay(endsSecond) {
    return parseInt(endsSecond % (60 * 24 * 30) / (60 * 24));
}

function setPopUp() {
    $('#exampleModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget)
        var recipient = button.data('title')
        var modal = $(this)
        modal.find('#title').text(recipient)
        modal.find('#loan-id').val(button.data('loan-id'))
        var endsSecond = button.data('term')
        var mounts = getMounts(endsSecond)
        var day = getDay(endsSecond)
        var endResult = getMounthAndDay(mounts, '', day);
        modal.find('#amountModal').text('Amount available: $' + button.data('available'))
        modal.find('#term_remaining').text('Loan ends in: ' + endResult)
    })
}

function setFromPopUp() {
    $(document).ready(function () {
        $('#exampleModal').on('click', '#pop-up-invest', function () {
            const invested = $('#invest-value').val();
            const loanId = $('#loan-id').val();
            investedId = loanId;

            var availableValue = loans[loanId].available.replace(',', '');

            loans[loanId].available = addComma((parseInt(availableValue) - invested).toString())

            renderMainPage()

        });
    })
}

function addComma(value) {
    return value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

function parse() {
    const json = "{\n" +
        "  \"loans\": [\n" +
        "    {\n" +
        "      \"id\": \"1\",\n" +
        "      \"title\": \"Voluptate et sed tempora qui quisquam.\",\n" +
        "      \"tranche\": \"A\",\n" +
        "      \"available\": \"11,959\",\n" +
        "      \"annualised_return\": \"8.60\",\n" +
        "      \"term_remaining\": \"864000\",\n" +
        "      \"ltv\": \"48.80\",\n" +
        "      \"amount\": \"85,754\"\n" +
        "    },\n" +
        "    {\n" +
        "      \"id\": \"5\",\n" +
        "      \"title\": \"Consectetur ipsam qui magnam minus dolore ut fugit.\",\n" +
        "      \"tranche\": \"B\",\n" +
        "      \"available\": \"31,405\",\n" +
        "      \"annualised_return\": \"7.10\",\n" +
        "      \"term_remaining\": \"1620000\",\n" +
        "      \"ltv\": \"48.80\",\n" +
        "      \"amount\": \"85,754\"\n" +
        "    },\n" +
        "    {\n" +
        "      \"id\": \"12\",\n" +
        "      \"title\": \"Dolores repudiandae ut voluptas unde laborum quaerat et sapiente.\",\n" +
        "      \"tranche\": \"C\",\n" +
        "      \"available\": \"12,359\",\n" +
        "      \"annualised_return\": \"4.80\",\n" +
        "      \"term_remaining\": \"879000\",\n" +
        "      \"ltv\": \"48.80\",\n" +
        "      \"amount\": \"85,754\"\n" +
        "    }\n" +
        "  ]\n" +
        "}";
    return JSON.parse(json).loans;
}