import Mock from 'mockjs';
const LoginUsers = [
  {
    username: 'admin',
    password: 'admin',
    accessToken:'token'
  }
];



var  loastNumber  = 0

const Users = [];
const _CostHistory  = {}
const _DetailHosty = {}
const _PlayerHistory = {}

for (let i = 0; i < 86; i++) {
  let item = Mock.mock({  
      id: Mock.Random.integer(1,1000),
      name: Mock.Random.cname(),
      account: Mock.Random.integer(100000,200000),
      roomid: Mock.Random.integer(1000,30000),
      sex: Mock.Random.integer(0, 1),
      gems: Mock.Random.integer(0, 100),
    })
  Users.push(item);
  _CostHistory[item.id] = []
  _DetailHosty[item.id] = []
  _PlayerHistory[item.id] = []
  for(let i = 0;i < 100 ;i++) {
    let history = Mock.mock({  ///消费历史
      id: loastNumber++,
      userid:item.id,
      gameid:Mock.Random.integer(1000,30000),
      description:{"type":"kdd","baseScore":1,"wanfaxuanze":0,"baogang":false,"zhuang":false,"cost":1,"maxGames":1,"creator":25},
      roomid: Mock.Random.integer(1000,30000),
      type: Mock.Random.integer(0, 1),
      cost: Mock.Random.integer(0, 10),
      costTime: Mock.Random.integer(1490265335675, 1490269335675),
    })
    let detail  = Mock.mock({  //进入游戏历史
      id: loastNumber++,
      userid:item.id,
      type: Mock.Random.integer(0, 3),
      roomid: Mock.Random.integer(1000,30000),
      time: Mock.Random.integer(1490265335675, 1490269335675),
      conf:{"type":"kdd","baseScore":1,"wanfaxuanze":0,"baogang":false,"zhuang":false,"cost":1,"maxGames":1,"creator":25},
      creator:Mock.Random.integer(1,1000),
      uuid:Mock.Random.integer(1,1000),
      isDestory:Mock.Random.integer(0,1),
      destoryTime: Mock.Random.integer(1490260335675, 1490269335675)
    })
    let playerHistory  = Mock.mock({  //游戏历史
      id: loastNumber++,
      userid:item.id,
      type: Mock.Random.integer(0, 4),
      gameid:Mock.Random.integer(1000,30000),
      roomid: Mock.Random.integer(1000,30000),
      time: Mock.Random.integer(1490265335675, 1490269335675),
      seats:[{"userid":25,"name":"东郭好运","score":10,"isHu":false},{"userid":27,"name":"东阳好运","score":0,"isHu":false},{"userid":26,"name":"轩辕雀圣","score":0,"isHu":false},{"userid":29,"name":"宇文自摸","score":0,"isHu":false}],
      isHu:Mock.Random.integer(0,1),
    })

    _CostHistory[item.id].push(history)
    _DetailHosty[item.id].push(detail)
    _PlayerHistory[item.id].push(playerHistory)
  }
  
}

const RoomList = []
 for(let i = 0;i < 100 ;i++) {
  let room = {
    id:Mock.Random.integer(1000,30000),
    uuid:Mock.Random.integer(1000,30000),
    base_info:Mock.Random.integer(1000,30000),
    create_time:Mock.Random.integer(1000,30000),
    num_of_turns:Mock.Random.integer(0,8),
    next_button:Mock.Random.integer(0,4),
    ip:Mock.Random.ip(),
    port:Mock.Random.integer(1000,30000),
    gameid:"testid",
    creator:Mock.Random.integer(1,100),
  }
  for(let j = 0; j < 4;j++) {
      room['user_id'+j] = Mock.Random.integer(0,4)
      room['user_name'+j] = Mock.Random.cname()
      room['user_score'+j] =  Mock.Random.integer(-100,100)
  }

  RoomList.push(room)

 }


export { LoginUsers, Users, _CostHistory,_DetailHosty,_PlayerHistory,RoomList};
