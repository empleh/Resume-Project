$(document).ready(function(){init();});

function init() {
    jsonLocation = "JSONData/";

    PopulateTechnicalSkills($("#technicalSkills"));   
}

function PopulateTechnicalSkills(tbl) {
    var tableData = new Array();

    $.getJSON(jsonLocation + "technicalSkills.json", function (data) {
        var technicalSkills = data["Technical Skills"];
        SortSkills(technicalSkills);
        technicalSkills.sort(function (a, b) { });
                    
        $.each(technicalSkills, function(index, item){
            var rowStyle = (index % 2 === 0) ? "ItemStyle" : "AlternatingItemStyle";
            tableData.push("<tr class='" + rowStyle  + "'>");
            tableData.push("<td>" + item["Skill"] + "</td>");
            tableData.push("<td>" + item["Years"] + "</td>");
            tableData.push("<td>" + item["Level"] + "</td>");
            tableData.push("</tr>");           
        });
        tbl.append(tableData.join(""));
});
}

function SortSkills(skills) {
    var levelValues = {"Expert":0,"Advanced":1,"Intermediate":2,"Beginner":3};
    skills.sort(function(a, b){
        if (a.Level === b.Level){
            if (a.Years === b.Years){
                return SkillCompare(a.Skill, b.Skill);
            }else{
                return YearsCompare(a.Years, b.Years);
            }
        }else{
            return LevelCompare(a.Level, b.Level, levelValues);
        }
    });
}

function SkillCompare(a, b){
    return a > b ? 1 : -1;
}

function YearsCompare(a, b){
    return a > b ? -1 : 1;
}

function LevelCompare(a, b, comparer){
    return comparer[a] > comparer[b] ? 1 : -1;
}
