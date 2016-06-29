var roleHarvester = require('role.harvester');
var roleUpgrader = require ('role.upgrader');
var roleBuilder = require ('role.builder');
module.exports.loop = function () {
   //clear memory

    for (let names in Memory.creeps)
    {
        if (Game.creeps[names]==undefined)
        {
            delete Memory.creeps[names];
        }
    }

    for(var name in Game.creeps)
    {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if (creep.memory.role =='upgrader')
        {
            roleUpgrader.run(creep);
        }
        if (creep.memory.role =='builder')
        {
            roleBuilder.run(creep);
        }

    }

    var newCreep = Game.rooms.E38N3.lookForAtArea(LOOK_CREEPS,43,37,45,39,true);
    console.log(newCreep.length);



    var minimumHarvesters = 3;
    var numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role =='harvester');
    var numberOfUpgraders= _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');
    var numberOfBuilders= _.sum(Game.creeps, (c) => c.memory.role == 'builder');

    if (numberOfUpgraders<3)
    {
        if (Game.spawns.Spawn1.energy==450)
        {
            Game.spawns.Spawn1.createCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE],undefined,{role:'upgrader',upgrading: false, source:1})
        }
        else if (Game.spawns.Spawn1.energy==400)
        {
            Game.spawns.Spawn1.createCreep([WORK,WORK,CARRY,MOVE,MOVE,MOVE],undefined,{role:'upgrader',upgrading: false, source:1})
        }
        else {
            Game.spawns.Spawn1.createCreep([WORK, CARRY, MOVE, MOVE, MOVE], undefined, {
                role: 'upgrader',
                upgrading: false,
                source: 1
            })
        }
    }
    if (numberOfBuilders<3)
    {
        if (Game.spawns.Spawn1.energy==450)
        {
            Game.spawns.Spawn1.createCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE],undefined,{role:'builder',building: false, source:1})
        }
        else if (Game.spawns.Spawn1.energy==400)
        {
            Game.spawns.Spawn1.createCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE],undefined,{role:'builder',building: false, source:1})
        }
        else {
            Game.spawns.Spawn1.createCreep([WORK, CARRY, CARRY, MOVE, MOVE], undefined, {
                role: 'builder',
                building: false
            })
        }
    }

    if((numberOfHarvesters<minimumHarvesters))
    {
       Game.spawns.Spawn1.createCreep([WORK,WORK,CARRY,MOVE,MOVE],undefined,{role:'harvester'})
   }

}
