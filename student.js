// ---------------- JPDB DETAILS ----------------

var jpdbBaseURL = "http://api.login2explore.com:5577";
var jpdbIRL = "/api/irl";
var jpdbIML = "/api/iml";

var dbName = "SCHOOL-DB";
var relName = "STUDENT-TABLE";

// Replace with your token
var connToken = "90935230|-31949242203615843|90958351";

var recNo = null;


// ---------------- RESET FORM ----------------

function resetForm() {

    $("#rollNo").val("");
    $("#fullName").val("");
    $("#studentClass").val("");
    $("#birthDate").val("");
    $("#address").val("");
    $("#enrollmentDate").val("");

    $("#rollNo").prop("disabled", false);

    $("#fullName").prop("disabled", true);
    $("#studentClass").prop("disabled", true);
    $("#birthDate").prop("disabled", true);
    $("#address").prop("disabled", true);
    $("#enrollmentDate").prop("disabled", true);

    $("#saveBtn").prop("disabled", true);
    $("#updateBtn").prop("disabled", true);
    $("#resetBtn").prop("disabled", true);

    $("#rollNo").focus();
}


// ---------------- ENABLE FIELDS ----------------

function enableFields() {

    $("#fullName").prop("disabled", false);
    $("#studentClass").prop("disabled", false);
    $("#birthDate").prop("disabled", false);
    $("#address").prop("disabled", false);
    $("#enrollmentDate").prop("disabled", false);

    $("#resetBtn").prop("disabled", false);
}


// ---------------- VALIDATE DATA ----------------

function validateData() {

    var rollNo = $("#rollNo").val();
    var fullName = $("#fullName").val();
    var studentClass = $("#studentClass").val();
    var birthDate = $("#birthDate").val();
    var address = $("#address").val();
    var enrollmentDate = $("#enrollmentDate").val();

    if (rollNo === "") {
        alert("Roll No Required");
        $("#rollNo").focus();
        return "";
    }

    if (fullName === "") {
        alert("Full Name Required");
        $("#fullName").focus();
        return "";
    }

    if (studentClass === "") {
        alert("Class Required");
        $("#studentClass").focus();
        return "";
    }

    if (birthDate === "") {
        alert("Birth Date Required");
        $("#birthDate").focus();
        return "";
    }

    if (address === "") {
        alert("Address Required");
        $("#address").focus();
        return "";
    }

    if (enrollmentDate === "") {
        alert("Enrollment Date Required");
        $("#enrollmentDate").focus();
        return "";
    }

    var jsonStrObj = {
        rollNo: rollNo,
        fullName: fullName,
        studentClass: studentClass,
        birthDate: birthDate,
        address: address,
        enrollmentDate: enrollmentDate
    };

    return JSON.stringify(jsonStrObj);
}


// ---------------- GET STUDENT ----------------

function getStudent() {

    var rollNo = $("#rollNo").val();

    if (rollNo === "") {
        return;
    }

    var getRequest = createGET_BY_KEYRequest(
        connToken,
        dbName,
        relName,
        JSON.stringify({rollNo: rollNo})
    );

    jQuery.ajaxSetup({async: false});

    var resultObj = executeCommandAtGivenBaseUrl(
        getRequest,
        jpdbBaseURL,
        jpdbIRL
    );

    jQuery.ajaxSetup({async: true});

    if (resultObj.status === 400) {

        enableFields();

        $("#saveBtn").prop("disabled", false);

        $("#fullName").focus();
    }

    else if (resultObj.status === 200) {

        enableFields();

        $("#updateBtn").prop("disabled", false);

        $("#rollNo").prop("disabled", true);

        var data = JSON.parse(resultObj.data);

        recNo = data.rec_no;

        var record = JSON.parse(data.record);

        $("#fullName").val(record.fullName);
        $("#studentClass").val(record.studentClass);
        $("#birthDate").val(record.birthDate);
        $("#address").val(record.address);
        $("#enrollmentDate").val(record.enrollmentDate);

        $("#fullName").focus();
    }
}


// ---------------- SAVE STUDENT ----------------

function saveStudent() {

    var jsonStr = validateData();

    if (jsonStr === "") {
        return;
    }

    var putRequest = createPUTRequest(
        connToken,
        jsonStr,
        dbName,
        relName
    );

    jQuery.ajaxSetup({async: false});

    var resultObj = executeCommandAtGivenBaseUrl(
        putRequest,
        jpdbBaseURL,
        jpdbIML
    );

    jQuery.ajaxSetup({async: true});

    alert("Data Saved Successfully");

    resetForm();
}


// ---------------- UPDATE STUDENT ----------------

function updateStudent() {

    var jsonStr = validateData();

    if (jsonStr === "") {
        return;
    }

    var updateRequest = createUPDATERecordRequest(
        connToken,
        jsonStr,
        dbName,
        relName,
        recNo
    );

    jQuery.ajaxSetup({async: false});

    var resultObj = executeCommandAtGivenBaseUrl(
        updateRequest,
        jpdbBaseURL,
        jpdbIML
    );

    jQuery.ajaxSetup({async: true});

    alert("Data Updated Successfully");

    resetForm();
}
