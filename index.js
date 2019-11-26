/**
 * Krishna Bhattarai
 * July 2018
 * A simple web server using express
 */

/**
 * CREATE READ UPDATE DELETE (CRUD)
 * POST GET PUT DELETE (PGPD)
 * Standard HTTP METHODS
 *
 * POST     = CREATE
 * GET      = READ
 * PUT      = UPDATE
 * DELETE   = DELETE
 */

require("pythonicjs")()

const express =  require('express')
const app = express()
app.use (express.json())                // so that we can use middleware to parse body parameters
const port = process.env.PORT || 3000
app.listen(port, function() { log(` Listening on port ${port}...`) })


const devices = [
    { id : 1, hostname: 'PI-00000000942c3e71', serial: '942c3e71', mac: 'b8:27:eb:2c:3e:71', created: '', updated: '' },
    { id : 2, hostname: 'PI-000000005ft6z32d', serial: '5ft6z32d', mac: 'b8:27:eb:t6:z3:2d', created: '', updated: '' }
]

/**
 * app.post()
 * app.get()
 * app.put()
 * app.delete()
 */


/**
 * Create | Register a new device
 */

/**
 * CREATE | POST
 * Request: POST /api/devices
 * Request body should be an object

 { hostname: 'PI-00000000942c3e71', serial: '942c3e71', mac: 'b8:27:eb:2c:3e:71' },

 * Response should be a just the 1 device that was just created

 { id: 1, hostname: 'PI-00000000942c3e71', serial: '942c3e71', mac: 'b8:27:eb:2c:3e:71', created: '', updated: '' },

 */

app.post("/api/devices", function(request, response){
    // TO DO
    // User joi to validate

    const error_message = `Bad request body! {"mac": "", "hostname": "", "serial": "" } must be provided!`

    const permitted_keys  = sorted([ "hostname", "serial",  "mac" ])
    const received_keys   = sorted(keys(request.body))
    print(permitted_keys)
    print(received_keys)

    if ( empty(request.body) || len(keys(request.body)) !== 3 || !equals(permitted_keys, received_keys) ) {
        response.status(400).send(error_message)
    }
    else {
        let device = request.body;
        device["id"] = len(devices) + 1
        device["created"] = timestamp()
        device["updated"] = timestamp()
        devices.push(device)    // this is where you would write to the db
        response.send(device)   // this is where you would read from the db and send it back
    }

})


/**
 * READ | GET
 * Request: GET /api/devices
 *
 * Response should be a list of all devices
    [
        { id : 1, hostname: 'PI-00000000942c3e71', serial: '942c3e71', mac: 'b8:27:eb:2c:3e:71', created: '', updated: '' },
        { id : 2, hostname: 'PI-000000005ft6z32d', serial: '5ft6z32d', mac: 'b8:27:eb:t6:z3:2d', created: '', updated: '' }
    ]

 * Request: GET /api/devices/:id
 * Request: GET /api/devices/1
 *
 * Response should be a just 1 device
    { id : 1, hostname: 'PI-00000000942c3e71', serial: '942c3e71', mac: 'b8:27:eb:2c:3e:71', created: '', updated: '' }

 */

app.get("/", function (request, response){
    response.send("Your have phoned home!")
})

app.get("/api/devices", function(request, response){
    response.send(devices)
})

app.get("/api/devices/:id", function(request, response){
    const my_device = devices.find(function(device){ return device.id === int(request.params.id) }) // read from the db and send it

    if (!my_device) response.status(404).send('The device with the given ID was not found!')

    response.send(my_device)
})

/**
 * UPDATE | PUT
 * Request: PUT /api/devices/id
 * Request: PUT /api/devices/2
 *
 * Request body should include the full (new) object to be updated but not the id
 { hostname: 'PI-000000006gu6x42t', serial: '6gu6x42t', mac: 'b8:27:eb:u6:x4:2t', created: '', updated: '' }

 * Response
 * Response should return the updated object

 { id: 2, hostname: 'PI-000000006gu6x42t', serial: '6gu6x42t', mac: 'b8:27:eb:u6:x4:2t', created: '', updated: '' }

 */

app.put("/api/devices/:id", function(request, response){
    // Look up the device
    // If not existing, return 404
    const my_device = devices.find(function(device){ return device.id === int(request.params.id) }) // read from the db and send it

    if (!my_device) response.status(404).send('The device with the given ID was not found!')

    // Validate
    // If invalid, return 400 - Bad request
    const error_message = `Bad request body! {"mac": "", "hostname": "", "serial": ""} must be provided!`

    // const permitted_keys  = sorted([ "hostname", "serial",  "mac"])
    // const received_keys   = sorted(keys(request.body))
    //
    //
    // if ( empty(request.body) || len(keys(request.body)) !== 3 || !equals(permitted_keys, received_keys) ) {
    //     response.status(400).send(error_message)
    // }

    // Update device
    // Return the updated device
    // else {
        let device = request.body;
        device["id"]  = my_device["id"]
        device["serial"] = my_device["serial"]
        device["mac"]  = my_device["mac"]
        device["hostname"] = request.body.hostname
        device["updated"] = timestamp()
        devices.push(device)    // this is where you would write to the db
        response.send(device)   // this is where you would read from the db and send it back
    // }

})

/**
 * DELETE | DELETE
 * Request: DELETE /api/devices/id
 * Request: DELETE /api/devices/3

 * Response
 * Response could be either successful deletion confirmation or failure message but to follow standard convention
 * one could simply return the deleted object as well
 */

app.delete("/api/devices/:id", function(request, response){
    const my_device = devices.find(function(device){ return device.id === int(request.params.id) }) // read from the db and send it

    if (!my_device) response.status(404).send('The device with the given ID was not found!')

    devices.splice(index(devices, my_device), 1)
    response.send(device)
})


