(function($) {
    var nodeidres = '';
    var setid = '';
    var obj_new = {};
    $.fn.orgChart = function(options) {
        var opts = $.extend({}, $.fn.orgChart.defaults, options);
        return new OrgChart($(this), opts);
    }

    $.fn.orgChart.defaults = {
        data: [{ id: 1, name: 'Root', parent: 0 }],
        showControls: false,
        allowEdit: false,
        onAddNode: null,
        onDeleteNode: null,
        onClickNode: null,
        newNodeText: '&nbsp;เพิ่ม'
    };

    function OrgChart($container, opts) {
        var data = opts.data;
        var nodes = {};
        var rootNodes = [];
        this.opts = opts;
        this.$container = $container;
        var self = this;

        this.draw = function() {
            $container.empty().append(rootNodes[0].render(opts));
            // $container.find('.node').click(function() {
            //     if (self.opts.onClickNode !== null) {
            //         self.opts.onClickNode(nodes[$(this).attr('node-id')]);
            //     }
            // });
            $container.find('.node').dblclick(function() {
                if (self.opts.onClickNode !== null) {
                    self.opts.onClickNode(nodes[$(this).attr('node-id')]);
                }
            });

            if (opts.allowEdit) {
                $container.find('.node h2').click(function(e) {
                    var thisId = $(this).parent().attr('node-id');
                    self.startEdit(thisId);
                    e.stopPropagation();
                });
            }

            // add "add button" listener
            $container.find('.org-add-button').click(function(e) {
                var thisId = $(this).parent().attr('node-id');

                if (self.opts.onAddNode !== null) {
                    self.opts.onAddNode(nodes[thisId], 'add-node');
                } else {
                    self.newNode(nodes[thisId]);
                }
                e.stopPropagation();
            });

            $container.find('.org-del-button').click(function(e) {
                var thisId = $(this).parent().attr('node-id');

                if (self.opts.onDeleteNode !== null) {
                    self.opts.onDeleteNode(nodes[thisId]);
                } else {
                    self.deleteNode(thisId);
                }
                e.stopPropagation();
            });
            $('#activeadd').on('click', function() {
                nodes[nodeidres].data.active_status = 2;
                $.post('addnode', { data: nodes[nodeidres].data }, function(res) {
                    $('#myModaladd').modal('hide');
                    nodes[nodeidres].data.id = nodes[nodeidres].data.ref_id;
                    var resdata = nodes[nodeidres];
                    delete nodes.id;
                    nodes[setid] = resdata;
                });
            });
            $('#inactiveadd').on('click', function() {
                nodes[nodeidres].data.active_status = 0;
                $.post('addnode', { data: nodes[id].data }, function(res) {
                    $('#myModaladd').modal('hide');
                    nodes[nodeidres].data.id = nodes[nodeidres].data.ref_id;
                    var resdata = nodes[nodeidres];
                    delete nodes.id;
                    nodes[setid] = resdata;
                });
            });
        }

        this.startEdit = function(id) {
            nodeidres = id;
            var inputElement = $('<input class="org-input" type="text"  id="NodeID_' + id + '" value="' + nodes[id].data.name + '"  dbid = ""/>');
            $container.find('div[node-id=' + id + '] h2').replaceWith(inputElement);

            var commitChange = function() {
                var h2Element = $('<h2>' + nodes[id].data.name + '</h2>');
                if (opts.allowEdit) {
                    h2Element.click(function() {
                        self.startEdit(id);
                    })
                }
                inputElement.replaceWith(h2Element);
            }
            inputElement.focus();
            inputElement.keyup(function(event) {
                if (event.which == 13) {
                    commitChange();
                } else {
                    $.get('getautoposition', { data: node.data.company }, function(res) {
                        data = [];
                        console.log(res);
                        $.each(res, function(index, value) {
                            data.push({
                                PositionName: value.Name,
                                PositonId: value.id,
                                PositionCode: value.PositionCode,
                                value: value.Name + value.PositionCode,
                                label: value.Name + value.PositionCode
                            });
                        });
                        $(".org-input").autocomplete({
                            source: data,
                            select: function(event, ui) {
                                // nodes[id].newidposition = ui.item.PositonId,
                                //     nodes[id].newPosision_code = ui.item.PositionCode,
                                //     nodes[id].newNameposition = ui.item.PositionName
                                // nodes[id].data.name = ui.item.PositionName;
                                // nodes[id].data.idPosition = ui.item.PositonId;
                                console.log(data);
                                var setref_id = '';
                                nodes[id].data.idPosition = ui.item.PositonId;
                                nodes[id].data.ref_id = ui.item.PositonId;
                                nodes[id].data.name = ui.item.PositionName;
                                setid = ui.item.PositonId;
                                setref_id = ui.item.PositonId;
                                $.post('addnode', { data: nodes[id].data }, function(res) {
                                    $(".red").remove();

                                });
                            }
                        });

                    });

                    //TODO : Auto Complete HERE
                    console.log(inputElement.val());
                }
            });
            inputElement.blur(function(event) {
                console.log(nodes[id]);
                if (nodes[id].data.idPosition == null) {
                    bootbox.alert({
                        size: 'small',
                        message: "<h4 class=\"btalert\">กรุณากรอกข้อมูล</h4>",
                        callback: function() {
                            $(".red").remove();
                            $('.org-input').after('<div class="red" name="afterAlear"><font color="red">Name is Required</font></font></div>');
                        }
                    });
                } else {
                    $('#myModaladd').modal('show');
                    commitChange();
                }
            })
        }

        this.newNode = function(parentId) {
            var nextId = Object.keys(nodes).length;
            while (nextId in nodes) {
                nextId++;
            }
            if (typeof(parentId) === 'object') {
                obj_new = {
                    id: nextId,
                    ref_id: null,
                    name: null,
                    company: parentId.company,
                    title: null,
                    parent: parentId.id,
                    Emp_id: null,
                    idPosition: null,
                    active_status: 1,
                    img: null
                }
                $.post('addnode', { data: obj_new }, function(res) {
                    obj_new.id = res;
                    console.log(obj_new.id);
                });
                self.addNode(obj_new);
            } else {
                self.addNode({ id: nextId, name: '', parent: parentId });
            }
        }

        this.addNode = function(data) {
            var newNode = new Node(data);
            nodes[data.id] = newNode;
            nodes[data.parent].addChild(newNode);

            self.draw();
            self.startEdit(data.id);
        }

        this.deleteNode = function(id) {
            var count = 0;
            for (var i = 0; i < nodes[id].children.length; i++) {
                // self.deleteNode(nodes[id].children[i].data.id);
                count++;
            }
            if (count == 1) {
                bootbox.alert({
                    size: 'small',
                    message: "<h4 class=\"btalert\">ไม่สามารถลบรายการได้ เนื่องจากมีตำแหน่ง</h4>",
                    callback: function() {}
                });
            } else {
                bootbox.confirm({
                    size: "small",
                    message: "<h4 class=\"btalert\">ยืนยันกรบลบรายการ? </h4>",
                    callback: function(result) {
                        if (result == 1) {
                            $.post('deletenodenew', { id: nodes[id].data.id }, function(res) {
                                nodes[nodes[id].data.parent].removeChild(id);
                                delete nodes[id];
                                self.draw();
                            });
                        }
                    }
                });

            }

        }

        this.getData = function() {
            var outData = [];
            for (var i in nodes) {
                outData.push(nodes[i].data);
            }
            return outData;
        }

        // constructor
        for (var i in data) {
            var node = new Node(data[i]);
            nodes[data[i].id] = node;
        }

        // generate parent child tree
        for (var i in nodes) {
            if (nodes[i].data.parent == 0) {
                rootNodes.push(nodes[i]);
            } else {
                if (nodes[nodes[i].data.parent] != null) {
                    nodes[nodes[i].data.parent].addChild(nodes[i]);
                }
            }
        }

        // draw org chart
        $container.addClass('orgChart');
        self.draw();
    }

    function Node(data) {
        this.data = data;
        this.children = [];
        var self = this;

        this.addChild = function(childNode) {
            // if (childNode !== undefined)
            this.children.push(childNode);
        }

        this.removeChild = function(id) {
            for (var i = 0; i < self.children.length; i++) {
                if (self.children[i].data.id == id) {
                    self.children.splice(i, 1);
                    return;
                }
            }
        }

        this.render = function(opts) {
            var childLength = self.children.length,
                mainTable;

            mainTable = "<table cellpadding='0' cellspacing='0' border='0'>";
            var nodeColspan = childLength > 0 ? 2 * childLength : 2;
            mainTable += "<tr><td colspan='" + nodeColspan + "'>" + self.formatNode(opts) + "</td></tr>";

            if (childLength > 0) {
                var downLineTable = "<table cellpadding='0' cellspacing='0' border='0'><tr class='lines x'><td class='line left half'></td><td class='line right half'></td></table>";
                mainTable += "<tr class='lines'><td colspan='" + childLength * 2 + "'>" + downLineTable + '</td></tr>';

                var linesCols = '';
                for (var i = 0; i < childLength; i++) {
                    if (childLength == 1) {
                        linesCols += "<td class='line left half'></td>"; // keep vertical lines aligned if there's only 1 child
                    } else if (i == 0) {
                        linesCols += "<td class='line left'></td>"; // the first cell doesn't have a line in the top
                    } else {
                        linesCols += "<td class='line left top'></td>";
                    }

                    if (childLength == 1) {
                        linesCols += "<td class='line right half'></td>";
                    } else if (i == childLength - 1) {
                        linesCols += "<td class='line right'></td>";
                    } else {
                        linesCols += "<td class='line right top'></td>";
                    }
                }
                mainTable += "<tr class='lines v'>" + linesCols + "</tr>";

                mainTable += "<tr>";
                for (var i in self.children) {
                    mainTable += "<td colspan='2'>" + self.children[i].render(opts) + "</td>";
                }
                mainTable += "</tr>";
            }
            mainTable += '</table>';
            return mainTable;
        }

        this.formatNode = function(opts) {
            var nameString = '',
                descString = '';
            if (typeof data.name !== 'undefined') {
                nameString = '<h2>' + self.data.name + '</h2>';
            }
            if (typeof data.description !== 'undefined') {
                descString = '<p>' + self.data.description + '</p>';
            }
            if (opts.showControls) {
                var buttonsHtml = "<div class='org-add-button'>" + opts.newNodeText + "</div><div class='org-del-button'></div>";
            } else {
                buttonsHtml = '';
            }
            return "<div class='node' node-id='" + this.data.id + "'>" + nameString + descString + buttonsHtml + "</div>";
        }
    }

})(jQuery);