import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { LoginUsers, Users,_CostHistory,_DetailHosty,_PlayerHistory,RoomList} from './data/user';
import _ from 'lodash'
let _Users = Users;
export default {
  /**
   * mock bootstrap
   */
  bootstrap() {
    let mock = new MockAdapter(axios);

    // mock success request
    mock.onGet('/success').reply(200, {
      msg: 'success'
    });

    // mock error request
    mock.onGet('/error').reply(500, {
      msg: 'failure'
    });

    //登录
    mock.onPost('/login').reply(config => {
  
      let {account, password} = JSON.parse(config.data);
      return new Promise((resolve, reject) => {
        let user = null;
        setTimeout(() => {
          let hasUser = LoginUsers.some(u => {
            if (u.username === account && u.password === password) {
              user = JSON.parse(JSON.stringify(u));
              user.password = undefined;
              user.accessToken = "1111111111111111111111111111";
              return true;
            }
          });

          if (hasUser) {
            resolve([200, { code: 200, msg: '请求成功', user }]);
          } else {
            resolve([200, { code: 500, msg: '账号或密码错误' }]);
          }
        }, 1000);
      });
    });

    //获取用户列表
    mock.onGet('/user/list').reply(config => {
      let {name} = config.params;
      let mockUsers = _Users.filter(user => {
        if (name && user.name.indexOf(name) == -1) return false;
        return true;
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            users: mockUsers
          }]);
        }, 1000);
      });
    });  
    mock.onGet('/user/findUser').reply(config => {
      let {id} = config.params;
      let mockUsers =_.find(_Users,{id:parseInt(id)})
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            users: mockUsers
          }]);
        }, 1000);
      });
    });

    //获取用户列表（分页）
    mock.onGet('/user/listpage').reply(config => {
      let {page} = config.params;
      let mockUsers = _Users
      let total = mockUsers.length;
      mockUsers = mockUsers.filter((u, index) => index < 1000 * page && index >= 1000 * (page - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            users: mockUsers
          }]);
        }, 1000);
      });
    });     
   //获取房间列表（分页）
    mock.onGet('/room/listpage').reply(config => {
      let {page} = config.params;
      let mockUsers = RoomList
      let total = mockUsers.length;
      mockUsers = mockUsers.filter((u, index) => index < 1000 * page && index >= 1000 * (page - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            rooms: mockUsers
          }]);
        }, 1000);
      });
    });
    mock.onGet('/user/addCound').reply(config => {
      let {id,number} = config.params;
      let mockUsers =_.find(_Users,{id:parseInt(id)})
      let rows = 0
      if(mockUsers) {
        rows = 1
        mockUsers.gems += parseInt(number)
      }
      console.log(mockUsers)
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            rows: rows
          }]);
        }, 1000);
      });
    });   



    mock.onGet('/user/history').reply(config => {
      let {page,id} = config.params;
      id =parseInt(id)
      let CostHistorys =  _CostHistory[id]
      let DetailHostys =  _DetailHosty[id]
      let PlayerHistorys =  _PlayerHistory[id]
      let CostHistorys_total = Math.ceil(CostHistorys.length/1000);
      let DetailHostys_total = Math.ceil(DetailHostys.length/1000);
      let PlayerHistorys_total = Math.ceil(PlayerHistorys.length/1000);

      CostHistorys = CostHistorys.filter((u, index) => index < 1000 * page.CostHistorys && index >= 1000 * (page.CostHistorys - 1));
      DetailHostys = DetailHostys.filter((u, index) => index < 1000 * page.DetailHostys && index >= 1000 * (page.DetailHostys - 1));
      PlayerHistorys = PlayerHistorys.filter((u, index) => index < 1000 * page.PlayerHistorys && index >= 1000 * (page.PlayerHistorys - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            history: {
              CostHistory:{CostHistorys_total,CostHistorys},
              DeTailHistory:{DetailHostys_total,DetailHostys},
              PlayerHistory:{PlayerHistorys_total,PlayerHistorys},
            }
          }]);
        }, 1000);
      });
    });

    //删除用户
    mock.onGet('/user/remove').reply(config => {
      let { id } = config.params;
      _Users = _Users.filter(u => u.id !== id);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 500);
      });
    });

    //批量删除用户
    mock.onGet('/user/batchremove').reply(config => {
      let { ids } = config.params;
      ids = ids.split(',');
      _Users = _Users.filter(u => !ids.includes(u.id));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 500);
      });
    });

    //编辑用户
    mock.onGet('/user/edit').reply(config => {
      let { id, name, addr, age, birth, sex } = config.params;
      _Users.some(u => {
        if (u.id === id) {
          u.name = name;
          u.addr = addr;
          u.age = age;
          u.birth = birth;
          u.sex = sex;
          return true;
        }
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '编辑成功'
          }]);
        }, 500);
      });
    });
    mock.onGet('/user/findById').reply(config => {
      let id = parseInt(config.params);
      let mockUsers = _Users
      mockUsers = _.filter(mockUsers,{id:id})
      let total = mockUsers.length||0;
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            users: mockUsers
          }]);
        }, 1000);
      });
    });

    //新增用户
    mock.onGet('/user/add').reply(config => {
      let { name, addr, age, birth, sex } = config.params;
      _Users.push({
        name: name,
        addr: addr,
        age: age,
        birth: birth,
        sex: sex
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '新增成功'
          }]);
        }, 500);
      });
    });

  }
};