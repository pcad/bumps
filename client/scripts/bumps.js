'use strict';
$(document).ready(function(){

	//Check for inline svg support
	if(Modernizr.inlinesvg){

		var countryList = ['Argentina','Australia','Brazil','Canada','China','France','Germany','India','Indonesia','Italy','Japan','Mexico','Russia','Saudi Arabia','South Africa','South Korea','Turkey','UK','USA'];

		var interact = function(svgId){

			svgId = '#' + svgId;

			//Get SVG root
			var svg = d3.select(svgId);

			//Get data regions, hide slope graphs
			var bumpVp = svg.select(svgId + 'dataVp_1');
			var slopeVp = svg.select(svgId + 'dataVp_2');
			slopeVp.attr('display','none');

			//Show SVG
			$(svgId).parent().removeClass('hidden');

			//Function to turn emboldening on/off
			var changeFont = function(criterion,newWeight){
				var firstBit = svgId + criterion;
				var leftString = firstBit + 'Left_1';
				var rightString = firstBit + 'Right_1';
				var leftNum = firstBit + 'LeftNum_1';
				var rightNum = firstBit + 'RightNum_1';

				svg.selectAll(leftString + ',' + rightString + ',' + leftNum + ',' + rightNum)
					.attr('font-weight',newWeight);
			};

			//Loop through each country
			for(var i=0; i<countryList.length; i++){
				var current = countryList[i].replace(/\W/g, '');

				var firstBit = svgId + current;
				var leftString = firstBit + 'Left_1';
				var rightString = firstBit + 'Right_1';

				//Add datum, pointer and click function to each country name
				svg.selectAll(leftString + ',' + rightString)
					.datum(current)
					.style('cursor','pointer')
					.on('click',function(data){

						var tipString = '.tip' + data;
						var tips = svg.selectAll(tipString);

						if(tips.empty()){

							changeFont(data,'bold');

							var bumpId = svgId + data + 'Bump_1';
							var theBump = svg.select(bumpId + ' polyline');
							var bumpData = theBump.attr('points');
							var slopeId = svgId + data + 'Slope_1';
							var theSlope = svg.select(slopeId + ' polyline');
							var slopeData = theSlope.attr('points');
							var theCol = theBump.attr('stroke');

							bumpVp.append('polyline')
									.attr('class','tooltip tip'+data)
									.attr('points',bumpData)
									.attr('fill','none')
									.attr('stroke-width',6);
							bumpVp.append('polyline')
									.attr('class','tooltip tip'+data)
									.attr('points',bumpData)
									.attr('stroke',theCol)
									.attr('stroke-width',3);

							slopeVp.append('polyline')
									.attr('class','tooltip tip'+data)
									.attr('points',slopeData)
									.attr('fill','none')
									.attr('stroke-width',6);
							slopeVp.append('polyline')
									.attr('class','tooltip tip'+data)
									.attr('points',slopeData)
									.attr('stroke',theCol)
									.attr('stroke-width',3);

						} else{
							changeFont(data,'normal');
							svg.selectAll('.tip'+data).remove();
						}
				});

				//Add pointer cursor and vis method toggle to title
				svg.select(svgId + 'theTitle_1').style('cursor','pointer')
					.on('click',function(){
						if(!bumpVp.attr('display')){
							bumpVp.attr('display','none');
							slopeVp.attr('display','');
						}else{
							bumpVp.attr('display','');
							slopeVp.attr('display','none');
						};
					});

			};

		};

		//Add d3 interactivity
		interact('cs');
		interact('e');
		interact('ep');

	//Show error message if browser does not support inline svg
	} else{
		$('#errMssg').removeClass('gone');
	};

});
