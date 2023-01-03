$(function(){
    $.ajax({
        url: "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-063?Authorization=CWB-C3ADEDDB-3CD4-498E-B05F-E4324F025AF6&format=JSON&locationName=%E4%B8%AD%E6%AD%A3%E5%8D%80&elementName=T",
        method: "GET",
        dataType: 'JSON',
        //data:    POST才會用到
        
        success:function(res){
            console.log(res);
            $('#city_name').html(res.records.locations[0].locationsName);
            $('#district').html(res.records.locations[0].location[0].locationName);
            $('#tempture').html(res.records.locations[0].location[0].weatherElement[0].time[0].elementValue[0].value + "&#176;");

            // 拆html架構
            let week = ["MON", "TUE", "WED", "THU", "FRI"];
            const html1 = `<div class="d-flex flex-column block"><small class="text-muted mb-0">`;
            const html2 = `</small><div class="text-center"><img class="symbol-img" src="`;
            const html3 = `"></div><h6><strong>`;
            const html4 = `&#176;</strong></h6></div>`;

            // 儲存所有迴圈html
            let weather_html = "";   

            // 星期 陣列的索引
            let j = 0;

            let img = "";

            // 迴圈取得溫度及判斷圖片並組合成html
            for(let i = 1; i < 10; i += 2){
                let tempture = res.records.locations[0].location[0].weatherElement[0].time[i].elementValue[0].value;
                if(tempture >= 18){
                    img = "https://i.imgur.com/Shrg84B.png";
                }else{
                    img = "https://i.imgur.com/BeWfUuG.png";
                }
                weather_html = weather_html + html1 + week[j] + html2 + img + html3 + tempture + html4;
                j++;
            }
            console.log(weather_html);
            $('#weekday').html(weather_html);
        },
        error:function(err){
            console.log(err)
        } 
      });
});