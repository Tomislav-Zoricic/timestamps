'use strict'
import { User, Project, Customer, Task } from './../sqldb'

// password: defaultPass!1
function getUsers () {
  return [
    {
      'email': 'tomislav.zoricic@gmail.com',
      'password': 'defaultPass!1',
      'first_name': 'Tomislav',
      'last_name': 'Zoricic'
    },
    {
      'email': 'dvladovic@extensionengine.com',
      'password': 'defaultPass!1',
      'first_name': 'Dario',
      'last_name': 'Vladovic'
    },
    {
      'email': 'ant_zemunik@yahoo.com',
      'password': 'defaultPass!1',
      'first_name': 'Antonio',
      'last_name': 'Zemunik'
    },
    {
      'email': 'matej@hotmail.com',
      'password': 'defaultPass!1',
      'first_name': 'Matej',
      'last_name': 'Salkovic'
    },
    {
      'email': 'nediljko@yahoo.com',
      'password': 'defaultPass!1',
      'first_name': 'Nediljko',
      'last_name': 'Krstic'
    },
    {
      'email': 'dp@gmail.com',
      'password': 'defaultPass!1',
      'first_name': 'Damir',
      'last_name': 'Perisic'
    }
  ]
}

function getCustomers () {
  return [
    {
      'email': 'bussiness_school@harvard.com',
      'company': 'Harvard University',
      'first_name': 'John',
      'last_name': 'Harvard',
      'address': 'Dunster Street 30',
      'postal_code': '02138',
      'city': 'Boston',
      'state': 'MA',
      'country': 'USA',
      'phone_number': '0016174951000'
    }
  ]
}

function getProjects () {
  return [
    {
      'name': 'HBP Reader',
      'description': 'Online reader for reading and annotating epubs across all devices',
      'budget': '250000',
      'customer_id': '1'
    },
    {
      'name': 'edX',
      'description': 'Massive open online course (MOOC) provider. It hosts online university-level courses in a wide range of disciplines to a worldwide student body, including some courses at no charge. It also conducts research into learning based on how people use its platform.',
      'budget': '2000000'
    }
  ]
}

function getTasks () {
  return [
    {
      'name': 'Backend engineer',
      'description': 'developing backend API by using node.js.',
      'rate': '8.25',
      'project_id': 1
    },
    {
      'name': 'Designer',
      'description': 'Designing UI.',
      'rate': '5.75',
      'project_id': 1
    },
    {
      'name': 'Frontend engineer',
      'description': 'Vue.js wizard',
      'rate': '6.66',
      'project_id': 1
    },
    {
      'name': 'Fullstack developer',
      'description': 'MEAN motherfu...',
      'rate': '9.99',
      'project_id': 2
    },
    {
      'name': 'Data analyst',
      'description': 'SVM, supervised, unsupervised, random forest, hadoop, etc etc.',
      'rate': '5.55',
      'project_id': 2
    }
  ]
}

let usersTasks = [
  {
    'user_id': 1,
    'task_id': 1
  },
  {
    'user_id': 2,
    'task_id': 2
  },
  {
    'user_id': 1,
    'task_id': 2
  },
  {
    'user_id': 3,
    'task_id': 2
  },
  {
    'user_id': 4,
    'task_id': 1
  },
  {
    'user_id': 3,
    'task_id': 3
  },
  {
    'user_id': 4,
    'task_id': 4
  },
  {
    'user_id': 5,
    'task_id': 5
  }
]

function getUsersTasks () {
  // Many to many users tasks.
  let bulk = usersTasks.map(userTask => {
    let userId = userTask['user_id']
    let taskId = userTask['task_id']
    return Task.findById(taskId).then(function (task) {
      return User.findById(userId).then(function (user) {
        return user.addTask(task)
      })
    }).catch(error => {
      console.warn('Error inserting users tasks', error)
    })
  })

  return bulk
}

export default function (bulk = false) {
  if (bulk) {
    User.bulkCreate(getUsers(), { individualHooks: true })
    .then(Customer.bulkCreate(getCustomers()))
    .then(Project.bulkCreate(getProjects()))
    .then(Task.bulkCreate(getTasks()))
    .then(() => { return Promise.all(getUsersTasks()) })
  } else return Promise.resolve(true)
}
