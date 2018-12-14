var patent_color;

var prev_coord = {};
var sweet_spot = [];
sweet_spot.push('r10c4');
sweet_spot.push('r10c5');
sweet_spot.push('r10c6');

const COMMENT_1 = 'Wow! The patent is in the novelty sweet spot!';
const COMMENT_2 = 'Wow! The patent is in the novelty sweet spot! Try to increase the extreme novelty?';
const COMMENT_3 = 'Wow! The patent is in the novelty sweet spot! Try to increase the central novelty?';
const COMMENT_4 = 'Wow! The patent is in the novelty sweet spot! Try to decrease the central novelty?';
const COMMENT_5 = 'Wow! The patent is in the novelty sweet spot! Try to increase the central and extreme novelty?';
const COMMENT_6 = 'Wow! The patent is in the novelty sweet spot! Try to decrease the central novelty and increase the extreme novelty?';
const COMMENT_7 = 'Ah, the patent is far from the novelty sweet spot. Try to increase the central and extreme novelty?';
const COMMENT_8 = 'Ah, the patent is far from the novelty sweet spot. Try to decrease the central novelty and increase the extreme novelty?';
const COMMENT_9 = 'Ah, the patent is far from the novelty sweet spot. Try to increase the extreme novelty?';
const NON_EXIST_COMMENT = 'Oops, please locate a utility patent granted by USPTO from 1986 to 2015.';
const PATENT_NO_FOUND = 'No patents have been found.';

var comments = [];
comments.push(COMMENT_1);
comments.push(COMMENT_2);
comments.push(COMMENT_3);
comments.push(COMMENT_4);
comments.push(COMMENT_5);
comments.push(COMMENT_6);
comments.push(COMMENT_7);
comments.push(COMMENT_8);
comments.push(COMMENT_9);

var left = [];
var index_obj_3 = {};
index_obj_3.r_min = 10;
index_obj_3.r_max = 10;
index_obj_3.c_min = 2;
index_obj_3.c_max = 3;
index_obj_3.index = 3;
left.push(index_obj_3);

var index_obj_5 = {};
index_obj_5.r_min = 8;
index_obj_5.r_max = 9;
index_obj_5.c_min = 2;
index_obj_5.c_max = 3;
index_obj_5.index = 5;
left.push(index_obj_5);

var index_obj_7 = {};
index_obj_7.index = 7;
left.push(index_obj_7);

var middle = [];
var index_obj_1 = {};
index_obj_1.r_min = 10;
index_obj_1.r_max = 10;
index_obj_1.c_min = 4;
index_obj_1.c_max = 6;
index_obj_1.index = 1;
middle.push(index_obj_1);

var index_obj_2 = {};
index_obj_2.r_min = 8;
index_obj_2.r_max = 9;
index_obj_2.c_min = 4;
index_obj_2.c_max = 6;
index_obj_2.index = 2;
middle.push(index_obj_2);

var index_obj_9 = {};
index_obj_9.index = 9;
middle.push(index_obj_9);

var right = [];
var index_obj_4 = {};
index_obj_4.r_min = 10;
index_obj_4.r_max = 10;
index_obj_4.c_min = 7;
index_obj_4.c_max = 8;
index_obj_4.index = 4;
right.push(index_obj_4);

var index_obj_6 = {};
index_obj_6.r_min = 8;
index_obj_6.r_max = 9;
index_obj_6.c_min = 7;
index_obj_6.c_max = 8;
index_obj_6.index = 6;
right.push(index_obj_6);

var index_obj_8 = {};
index_obj_8.index = 8;
right.push(index_obj_8);

var timer;

var ajax_request;
var isCanceled;

function getComment(row, column) {
    if (!row && !column) {
        return NON_EXIST_COMMENT;
    } else if (column >= 1 && column <= 3) {
        return getLeftComment(row, column);
    } else if (column >= 4 && column <= 6) {
        return getMiddleComment(row, column);
    } else {
        return getRightComment(row, column);
    }
}

function getLeftComment(row, column) {
    return getSpotComment(row, column, left);
}

function getMiddleComment(row, column) {
    return getSpotComment(row, column, middle);
}

function getRightComment(row, column) {
    return getSpotComment(row, column, right);
}

function getSpotComment(row, column, index_array) {
    for (var i = 0; i < index_array.length - 1; i++) {
        var comment = index_array[i];
        var r_min = comment.r_min;
        var r_max = comment.r_max;
        var c_min = comment.c_min;
        var c_max = comment.c_max;

        if (row >= r_min && row <= r_max && column >= c_min && column <= c_max) {
            return comments[comment.index - 1];
        }
    }

    return comments[index_array[index_array.length - 1].index - 1];
}

$(function() {

    //2017.12.12
    //get the historical searched patent list
    //patent_list = getHistoricalSearchedPatents();
    patent_list = "";

    // var url = 'http://52.221.86.148/api/ideation/searched_patents';
    // $.ajax({
    //     url: url,
    //     type: 'POST',
    //     contentType: 'application/json',
    //     success: function(data) {
    //         console.log(data);
    //         patent_list = data.searched_patents; 
    //         //add a dropdown list
    //     }
    // });

    patent_history=[
        "5106085",
        "5219750",
        "5791921",
        "6345294",
        "6356995",
        "7130051",
        "7285709",
        "8819038",
        "8972405",
        ];


    $( "#patent-number-input" ).autocomplete({
      minLength: 0,
      source: patent_history
      
    }).on('focus', function() { $(this).keydown(); });

    // define keywords_history to test the autocomplete
                // var keywords_history = [   // for test
                //   "big data",
                //   "electromeganenic"
                // ];
    $( "#keywords-input" ).autocomplete({
                // source: keywords_history   // for test

      source: function(request, response) {
      console.log("Making request of wikipedia:" + request.term);

      $.ajax({
            url: "http://en.wikipedia.org/w/api.php",
            dataType: "jsonp",
            data: {
                'action': "opensearch",
                'format': "json",
                'search': request.term
            },
            success: function(data) {
                response(data[1]);
            }
        });

    },
    minLength: 1,
    select: function(event, ui) {
      $("#SameAs").text(ui.item.Label);
    }

    });


    // $('[data-toggle="tooltip"]').tooltip({
    //     trigger: 'hover'
    // });


    $('#patent-form').submit(function(e) {
        e.preventDefault();
        var pid = $('#patent-number-input').val();
        console.log(pid);
        $('#card').hide();
        if (pid !== ""){
            $('#keywords_card').hide();
            submitToServer(pid, patent_list, "pid"); //2017.12.12
            // $('#card').show();
        }
        patent_history.unshift(pid);
        // patent_history = [pid, patent_history];
        console.log(patent_history);
    });

    //2017.12.12
    $('#keyword-form').submit(function(e) {
        e.preventDefault();
        getPatentsByKeywords(); //2017.12.12
        resetPreviousCoord();
    });

    // $('#feedback-form').submit(function(e) {
    //     e.preventDefault();
    //     var email = $('#email-input').val();
    //     var feedback = $('#feedback-input').val();
    //     $.ajax({
    //         url: 'feedback.php',
    //         type: 'POST',
    //         data: { email: email, feedback: feedback },
    //         success: function(data) {
    //             $('#email-input').val('');
    //             $('#feedback-input').val('');
    //             clearTimeout(timer);
    //             $('#submission-comment').show();
    //             timer = setTimeout(function() { $('#submission-comment').hide(); }, 5000);
    //         }
    //     });
    // });

    //2017.12.12
    $( "#keyword-patent-input" ).click(function() {
        var pid = $("input[name='patent']:checked").val();
        if (pid !== undefined){
            submitToServer(pid, patent_list); //2017.12.12
        }
        
    });

    $("input[name='patent']").change(function(){
  
        alert("Allot Thai Gayo Bhai");
                   
    });

    $("#keywords_card").click(function(){
        var pid = $("input[name='patent']:checked").val();
        if (pid !== undefined){
            submitToServer(pid, patent_list, "keywords"); //2017.12.21
        }
    });


    // cancel loading
    $('#close-loading').click(function() {
        isCanceled = true;
        // override onredystatechange method to prevent success callback function being fired
        ajax_request.onreadystatechange = function () {};
        ajax_request.abort();
    });
});

//2017.12.12
function getHistoricalSearchedPatents() {
    var url = 'http://52.221.86.148/api/ideation/searched_patents';
    $.ajax({
        url: url,
        async: true,
        type: 'POST',
        contentType: 'application/json',
        success: function(data) {
            console.log(data);
            patent_list = data.searched_patents;
            //add a dropdown list;
        }
    });
    // return patent_list;
}

//2017.12.12
function getPatentsByKeywords() {
    var url = 'http://52.221.86.148/api/ideation/technology_keywords';
    var keywords_str = $("#keywords-input").val().split(",");
    var keywords_list = []
    for (var i = 0; i < keywords_str.length; i++) {
        keywords_list.push(keywords_str[i].trim());
    }
    //console.log(keywords_list);
    // keywords_list = ["big data"];
    $("#patent-info-panel").html("");
    $("#keywords_card").html("");
    ajax_request = $.ajax({
        url: url,
        type: 'POST',
        beforeSend: function () {
            $('#myModal').modal('hide');
            $('#keywords_card').hide();
            $('#card').hide();
            $('#loadingSpinnerModal').modal('show');
        },
        complete: function () {
            $('#loadingSpinnerModal').modal('hide');
            if(!isCanceled) {
                //$('#myModal').modal('show');
                $("#card").hide();
                $("#keywords_card").show();
            }
            isCanceled = false;            
        },
        contentType: 'application/json',
        data: JSON.stringify({ "words_list": keywords_list }),
        success: function(info) {
            console.log(info);
            var patents = info.patents.patent_info;
            var info_len = patents.length;
            if (info_len == 0){
                //$("#patent-info-panel").append($('<label />', { 'text': PATENT_NO_FOUND}));
                $("#keywords_card").append($('<label />', {'text': PATENT_NO_FOUND}));
            } else{
                //var existing_patent_list = info.patents.existing_patent_list;
                var existing_patent_dict = info.patents.existing_patent_dict;
                var existing_patent_list = sortDictionaryByDate(existing_patent_dict);
              $("#keywords_card").append('<div class="row"><h4 style="font-size: 24px;font-weight: 500;color: #555555;margin-bottom: 8px;margin-left: 6px">Keywords Searching Result</h4> </div>');
                for (var i = 0; i < existing_patent_list.length; i++) {
                    var pid = existing_patent_list[i];
                    //var pid = Object.keys(existing_patent_dict);
                    var patent_url = 'https://www.google.com.sg/patents/US' + pid; 
                    var patent_title = '<span style="font-weight: bold">' + patents[pid].patent_title + '</span>';
                    var patent_link = '<a href="' + patent_url + '" target="_blank">' + "&gt&gt" + '</a>';
                    display_info = "\t" + patent_title + ", " + patents[pid].asg_name + ", " + patents[pid].asg_country + ", " + patents[pid].patent_date + ". " +"\t"+ patent_link;
                    $("#keywords_card").append('<div class="form-check"><label class="form-check-label"><input class="form-check-input" type="radio" name="patent" value="'+pid+'">'+display_info+'</label></div>');
                }
            }
        }
    });
}

function sortDictionaryByDate(data) {
    var result = Object.keys(data).sort(function (a, b) {
        return new Date(data[b]).getTime() - new Date(data[a]).getTime();
    });
    return result;
}

function submitToServer(pid, patent_list, tag) {
    var url = 'http://52.221.86.148/api/ideation/patent_coordinates';

    //get the historical searched patents, save to patent_list
    //var patent_list = global_data;  //for test
    //var stored_opt = checkPatentInHistoricalSearchedPatents(patent_list, pid); //2017.12.12
    //console.log(stored_opt);

    $.ajax({
        url: url,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ "patent_number": pid}),
        success: function(data) {
            //    console.log(data);
            if (data.coordinates.length > 0) {
                highlight(data.coordinates[0].y_coord, data.coordinates[0].x_coord);
                if (tag == "pid"){
                    updateCommentArea(pid, data.coordinates[0].y_coord, data.coordinates[0].x_coord);
                }
                
            } else {
                highlight();
                //    resetCommentArea();
                // updateCommentArea(pid);
                resetCommentArea(pid);
                // alert("No result due to one of the following reasons:\n1) This is not a valid patent number.\n2) This patent does not have enough information for the 2D novelty assessment.");
                alert("No such patent in the database. Please contact us in About Us Page!")
            }

        }
    });
}

//2017.12.12
function checkPatentInHistoricalSearchedPatents(patent_list, pid) {
    if (patent_list.indexOf(pid) >= 0) {
        return 0; //existent
    } else {
        patent_list.push(pid);
        return 1; //not existent
    }
}

function resetCommentArea() {
    $('#spot-comment').hide();
    $('#title-patent').text('');
    $('#card_patentTitle').text('Patent title')
    $('#card_patentNumber').text('');
    $('#card_publicationDate').text('')
    $('#card_filingDate').text('')
    $('#card_priorityDate').text('')
    // $('#card_citedBy').text('')
    $('#card_inventers').text('')
    $('#card_originalAssignee').text('')
    $('#abstract').text('')
    $('#').text('')
    // $('#spot-comment').text('');
}

// function updateCommentArea(patent_number, row, column) {

//     resetCommentArea();
//     $('#title').show();
//     // $('#spot-comment').show();

//     var patent_url = 'https://www.google.com.sg/patents/US' + patent_number;
//     // $('#title-patent').text(patent_number);
//     // $("#title-patent").append('<a href="'+patent_url + '">' + patent_number + '</a>');
//     // console.log('<a href="'+patent_url + '"' + patent_number + '</a>');

//     //$('#title-patent').text(patent_number);

//     var api_url = 'http://52.221.86.148/api/ideation/' + "patent_info";
//     $.ajax({
//         url: api_url,
//         type: 'POST',
//         contentType: 'application/json',
//         data: JSON.stringify({ "patent_number": patent_number}),
//         success: function(data) {
//             patent_info = data.patent_info;
//             console.log(patent_info);
//             $("#card_patentNumber").text(patent_number);
//             // console.log(patent_number);   //update text
//             var patent_title = patent_info.patent_title;
//             // $('#card_patentTitle').text(patent_title);
//             $("#card_patentTitle").text('');
//             $("#card_patentTitle").append('<a href="' + patent_url + '" target="_blank">' + patent_title + '</a>');
//             // console.log(patent_title);   //update text
//             var grant_date = patent_info.grant_date;
//             $('#card_publicationDate').text(grant_date);
//             // console.log(grant_date);  //update text
//             var app_date = patent_info.app_date;
//             $('#card_filingDate').text(app_date);
//             // console.log(app_date);   //update text
//             // var forward_citations = patent_info.forward_citations;
//             // $('#card_citedBy').text(forward_citations);
//             // console.log(forward_citations);  //update text
//             var inventors = patent_info.inventors[0];
//             for (var i=1; i<Object.keys(patent_info.inventors).length; i++){
//                 inventors = inventors + ", " + patent_info.inventors[i];
//             }
//             $('#card_inventers').text(inventors);
//             // console.log(inventors);
            
//             if (patent_info.assignees[0] == null) {
//                 $('#card_originalAssignee').text('(No assignees)');
//             } else {
//                 var assignees = patent_info.assignees[0];
//                 for (var i=1; i < patent_info.assignees.length; i++){
//                     assignees = assignees + ", " + patent_info.assignees[i];
//                 }
//                 $('#card_originalAssignee').text(assignees);
//             }
//             // console.log(assignees);  //update text
//             // var patent_abstract = patent_info.patent_abstract;
//             // $('#abstract').text(patent_abstract);
//             // console.log(patent_abstract);   //update text

            
//         }
//     });
//     // $('#spot-comment').text(getComment(row, column));
// }

//Update patent information panel - 2017.12.27
function updateCommentArea(patent_number, row, column) {

    resetCommentArea();
    $('#title').show();
    // $('#spot-comment').show();

    var patent_url = 'https://www.google.com.sg/patents/US' + patent_number;

    var api_url = "http://www.patentsview.org/api/patents/query?";

    // api_url = 'http://www.patentsview.org/api/patents/query?q={"patent_number":"' + patent_number + '""}';
    // api_url = api_url + '&f=["patent_title","patent_date", "app_date", "inventor_first_name",';
    // api_url = api_url + '"inventor_last_name", "assignee_organization", "inventor_sequence"]';

    var q_string = 'q={"patent_number":"' + patent_number + '"}';
    var f_string = '&f=["patent_title","patent_date", "app_date", "inventor_first_name","inventor_last_name", "assignee_organization", "inventor_sequence", "patent_abstract"]';

     // $.ajax({
     //        type: "GET",
     //        url: api_url,
     //        cache: false,
     //        data: q_string + f_string + o_string,
     //        async: false,

    $.ajax({
        url: api_url,
        type: 'GET',
        cache: false,
        data: q_string + f_string,
        success: function(data) {
            //console.log(data);
            var patent_info = data.patents[0];
            console.log(data);
            $("#card_patentNumber").text(patent_number);
            // console.log(patent_number);   //update text
            var patent_title = patent_info['patent_title'];
            //$('#card_patentTitle').text(patent_title);
            //console.log(patent_title);
            $("#card_patentTitle").text('');
            $("#card_patentTitle").append('<a href="' + patent_url + '" target="_blank">' + patent_title + '</a>');
            // console.log(patent_title);   //update text
            var grant_date = patent_info['patent_date'];
            $('#card_publicationDate').text(grant_date);
            // // console.log(grant_date);  //update text
            var app_date = patent_info['applications'][0]['app_date'];
            $('#card_filingDate').text(app_date);
            // // console.log(app_date);   //update text
            // // var forward_citations = patent_info.forward_citations;
            // // $('#card_citedBy').text(forward_citations);
            // // console.log(forward_citations);  //update text
            var name = patent_info['inventors'][0]['inventor_first_name'] + ' ' + patent_info.inventors[0]['inventor_last_name'];
            var inventors = name;
            for (var i = 1; i<Object.keys(patent_info['inventors']).length; i++){
                name = patent_info['inventors'][i]['inventor_first_name'] + ' ' + patent_info.inventors[i]['inventor_last_name'];
                inventors = inventors + ", " + name;
            }
            $('#card_inventers').text(inventors);
            // // console.log(inventors);
            
            if (patent_info['assignees'][0]['assignee_organization'] == null) {
                $('#card_originalAssignee').text('(No assignee)');
            } else {
                var assignees = patent_info['assignees'][0]['assignee_organization'];
                for (var i=1; i < patent_info['assignees'].length; i++){
                    assignees = assignees + ", " + patent_info['assignees'][i]['assignee_organization'];
                }
                $('#card_originalAssignee').text(assignees);
            }
            // // console.log(assignees);  //update text
            var patent_abstract = patent_info.patent_abstract;
            $('#abstract').text(patent_abstract);
            // // console.log(patent_abstract);   //update text
          document.getElementById('card').style.borderLeft = "8px solid "+patent_color;
          $('#card').show();

        }
    });
    // $('#spot-comment').text(getComment(row, column));
}

function highlight(row, column) {
    resetPreviousCoord();
    var change = changeCoordColor(row, column);
    if (change) {
        prev_coord.row = row;
        prev_coord.column = column;
    }
}


function resetPreviousCoord() {

    var row = prev_coord.row;
    var column = prev_coord.column;
    var change = resetCoordColor(row, column);
    if (change) {
        prev_coord.row = undefined;
        prev_coord.column = undefined;
    }
    //resetSweetSpot();

}

function changeCoordColor(row, column) {
    if (row && row !== '' && column && column !== '') {
        var id = 'r' + row + 'c' + column;
        d3.select('#' + id).style("stroke", '#c1272d').style("stroke-width",2);
        patent_color = d3.select('#'+id).attr("fill");
        console.log(patent_color);
        return true;

    }
    return false;
}
function resetCoordColor(row,column) {
  if (row && row !== '' && column && column !== '') {
    var id = 'r' + row + 'c' + column;
    d3.select('#' + id).style("stroke-width",0);
    return true;

  }
  return false;
}
function resetSweetSpot() {
    /*
    $.each(sweet_spot, function(index, value) {
        var id = value;
        d3.select('#' + id).style("stroke-width", 0);
    })*/

}

