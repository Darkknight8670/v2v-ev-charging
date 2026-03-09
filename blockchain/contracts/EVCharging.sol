// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract EVCharging {

    struct Charger {
        address owner;
        uint pricePerKwh;
        bool available;
    }

    struct ChargingSession {
        address user;
        uint chargerId;
        uint startTime;
        uint energyUsed;
        uint deposit;
        bool active;
    }

    uint public chargerCount;
    uint public sessionCount;

    mapping(uint => Charger) public chargers;
    mapping(uint => ChargingSession) public sessions;

    event ChargerRegistered(uint chargerId, address owner);
    event ChargingStarted(uint sessionId, uint chargerId, address user);
    event ChargingStopped(uint sessionId, uint energyUsed, uint payment);

    // Register a new charger
    function registerCharger(uint pricePerKwh) public {

        chargerCount++;

        chargers[chargerCount] = Charger({
            owner: msg.sender,
            pricePerKwh: pricePerKwh,
            available: true
        });

        emit ChargerRegistered(chargerCount, msg.sender);
    }

    // Start charging session with deposit
    function startCharging(uint chargerId) public payable {

        require(chargers[chargerId].available == true, "Charger not available");
        require(msg.value > 0, "Deposit required");

        sessionCount++;

        sessions[sessionCount] = ChargingSession({
            user: msg.sender,
            chargerId: chargerId,
            startTime: block.timestamp,
            energyUsed: 0,
            deposit: msg.value,
            active: true
        });

        emit ChargingStarted(sessionCount, chargerId, msg.sender);
    }

    // Stop charging session and release payment
    function stopCharging(uint sessionId, uint energyUsed) public {

        ChargingSession storage session = sessions[sessionId];

        require(session.active == true, "Session already stopped");

        Charger memory charger = chargers[session.chargerId];

        uint payment = energyUsed * charger.pricePerKwh;

        require(session.deposit >= payment, "Insufficient deposit");

        session.energyUsed = energyUsed;
        session.active = false;

        payable(charger.owner).transfer(payment);

        uint refund = session.deposit - payment;

        if(refund > 0){
            payable(session.user).transfer(refund);
        }

        emit ChargingStopped(sessionId, energyUsed, payment);
    }
}