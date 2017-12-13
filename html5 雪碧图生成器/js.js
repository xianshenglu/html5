window.onload = function() {
    var dropBox = document.getElementsByClassName('dropBox')[0],
    fileInput=document.getElementById('fileInput');

    fileInput.onchange=function(){
    	var files=this.files;
    	hideHintAndProcessFiles(files);
    };
    
    dropBox.ondrop = function(event) {
        var e = event || window.event,
            files = e.dataTransfer.files;
        e.preventDefault();
        e.stopPropagation();

        hideHintAndProcessFiles(files);
        
    };

    function hideHintAndProcessFiles (files) {
    	var hint=dropBox.getElementsByClassName('hint')[0];
    	//提示背景去掉
        if (hint) {
        	hint.className='';
        }

        processFiles(files);
    }

    function processFiles(files) {

        for (var i = 0; i < files.length; i++) {
            var reader = new FileReader();

            reader.onload = function() {
                moveImgToDropBox(this.result);                
            };

            reader.readAsDataURL(files[i]);
        }

        function moveImgToDropBox(url) {
            var img = document.createElement('img');
            img.src = url;
            dropBox.appendChild(img);
        }

        var dropBoxImg = dropBox.getElementsByTagName('img'),
        canvas = document.getElementsByTagName('canvas')[0];

        var makeSpiritBtn = document.getElementById('makeSpirit');
        makeSpiritBtn.onclick = makeSpirit;

        var downloadSpiritBtn = document.getElementById('downloadSpirit');
        downloadSpiritBtn.onclick = downloadSpirit;

        function makeSpirit() {
            var direction = getSettingData().direction,
                spacing = getSettingData().spacing;

            makeSpiritInPreview(direction, spacing);
            makeSpiritInCanvas(direction, spacing);
        }

        function getSettingData() {
            return {
                direction: document.getElementById('direction').value,
                spacing: parseInt(document.getElementById('spacing').value)
            };
        }

        function makeSpiritInPreview(direction, spacing) {

            if (direction === 'vertical') {
                for (var i = 0; i < dropBoxImg.length; i++) {
                    dropBoxImg[i].className = 'vertical';
                    dropBoxImg[i].style.marginBottom = spacing + 'px';
                    dropBoxImg[i].style.marginRight = 0;
                }
            } else if (direction === 'horizontal') {
                for (var j = 0; j < dropBoxImg.length; j++) {
                    dropBoxImg[j].className = 'horizontal';
                    dropBoxImg[j].style.marginRight = spacing + 'px';
                    dropBoxImg[j].style.marginBottom = 0;
                }
            }

        }

        function makeSpiritInCanvas(direction, spacing) {
            var context = canvas.getContext('2d'),
                dropBoxImgHeight = [],
                dropBoxImgWidth = [],
                dropBoxImgMaxHeight = 0,
                dropBoxImgMaxWidth = 0,
                dropBoxImgSumHeight = 0,
                dropBoxImgSumWidth = 0;

            for (var i = 0; i < dropBoxImg.length; i++) {
                dropBoxImgHeight.push(dropBoxImg[i].height);
                dropBoxImgSumHeight = dropBoxImgSumHeight + dropBoxImg[i].height + spacing;
                dropBoxImgWidth.push(dropBoxImg[i].width);
                dropBoxImgSumWidth = dropBoxImgSumWidth + dropBoxImg[i].width + spacing;
            }

            dropBoxImgMaxHeight = Math.max.apply(null, dropBoxImgHeight);
            dropBoxImgMaxWidth = Math.max.apply(null, dropBoxImgWidth);

            canvasDrawImage(direction);

            function canvasDrawImage(direction) {
                var canvasImgPosX = 0,
                    canvasImgPosY = 0;

                if (direction === 'vertical') {
                    canvas.height = dropBoxImgSumHeight;
                    canvas.width = dropBoxImgMaxWidth;

                    for (var j = 0; j < dropBoxImg.length; j++) {
                        if (j === 0) {
                            canvasImgPosY = 0;
                            canvasImgPosX = 0;
                        } else {
                            canvasImgPosY = canvasImgPosY + dropBoxImg[j - 1].height + spacing;
                            canvasImgPosX = 0;
                        }
                        context.drawImage(dropBoxImg[j], canvasImgPosX, canvasImgPosY);
                    }

                } else if (direction === 'horizontal') {
                    canvas.height = dropBoxImgMaxHeight;
                    canvas.width = dropBoxImgSumWidth;

                    for (var k = 0; k < dropBoxImg.length; k++) {
                        if (k === 0) {
                            canvasImgPosY = 0;
                            canvasImgPosX = 0;
                        } else {
                            canvasImgPosY = 0;
                            canvasImgPosX = canvasImgPosX + dropBoxImg[k - 1].width + spacing;
                        }
                        context.drawImage(dropBoxImg[k], canvasImgPosX, canvasImgPosY);
                    }
                }

            }
        }

        function downloadSpirit() {
            var aLink = document.createElement('a');
            aLink.href = canvas.toDataURL();
            aLink.download = 'spirite.png';
            //兼容FF,需要添加到页面中才有用
            document.body.appendChild(aLink);
            aLink.style.display='none';
            aLink.click();
        }
        
    }

    //阻止默认行为
    dropBox.ondragenter = function(event) {
        var e = event || window.event;
        ingoreDrag(e);
    };

    dropBox.ondragover = function(event) {
        var e = event || window.event;
        ingoreDrag(e);
    };

    function ingoreDrag(e) {
        e.preventDefault();
        e.stopPropagation();
    }


};