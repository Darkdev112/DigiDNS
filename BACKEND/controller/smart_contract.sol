// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RecordManager {
    struct Record {
        string hostname;
        string recordType;
        uint256 ttl;
        string data;
        string email;
    }

    // Mapping to store records by hostname
    mapping(string => Record) private records;

    // Array to keep track of all hostnames
    string[] private hostnames;

    // Events for tracking actions
    event RecordAdded(string hostname);
    event RecordDeleted(string hostname);
    event RecordUpdated(string hostname);

    // Add a new record
    function addRecord(
        string memory hostname,
        string memory recordType,
        uint256 ttl,
        string memory data,
        string memory email
    ) public {
        require(bytes(hostname).length > 0, "Hostname cannot be empty");
        require(bytes(records[hostname].hostname).length == 0, "Record already exists");

        records[hostname] = Record(hostname, recordType, ttl, data, email);
        hostnames.push(hostname);

        emit RecordAdded(hostname);
    }

    // Delete an existing record
    function deleteRecord(string memory hostname) public {
        require(bytes(records[hostname].hostname).length > 0, "Record does not exist");

        delete records[hostname];

        // Remove hostname from the array
        for (uint256 i = 0; i < hostnames.length; i++) {
            if (keccak256(abi.encodePacked(hostnames[i])) == keccak256(abi.encodePacked(hostname))) {
                hostnames[i] = hostnames[hostnames.length - 1];
                hostnames.pop();
                break;
            }
        }

        emit RecordDeleted(hostname);
    }

    // Update an existing record
    function updateRecord(
        string memory hostname,
        string memory recordType,
        uint256 ttl,
        string memory data,
        string memory email
    ) public {
        require(bytes(records[hostname].hostname).length > 0, "Record does not exist");

        records[hostname] = Record(hostname, recordType, ttl, data, email);

        emit RecordUpdated(hostname);
    }

    // Get a single record by hostname
    function getRecord(string memory hostname) public view returns (Record memory) {
        require(bytes(records[hostname].hostname).length > 0, "Record does not exist");
        return records[hostname];
    }

    // Get all records
    function getAllRecords() public view returns (Record[] memory) {
        Record[] memory result = new Record[](hostnames.length);
        for (uint256 i = 0; i < hostnames.length; i++) {
            result[i] = records[hostnames[i]];
        }
        return result;
    }

    // Search records by partial hostname (case-sensitive)
    function searchRecord(string memory partialHostname) public view returns (Record[] memory) {
        uint256 count = 0;

        // First pass: count matches
        for (uint256 i = 0; i < hostnames.length; i++) {
            if (contains(hostnames[i], partialHostname)) {
                count++;
            }
        }

        // Second pass: collect matches
        Record[] memory result = new Record[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < hostnames.length; i++) {
            if (contains(hostnames[i], partialHostname)) {
                result[index] = records[hostnames[i]];
                index++;
            }
        }

        return result;
    }

    // Helper function: check if a string contains another string
    function contains(string memory a, string memory b) internal pure returns (bool) {
        bytes memory aBytes = bytes(a);
        bytes memory bBytes = bytes(b);

        if (bBytes.length > aBytes.length) {
            return false;
        }

        for (uint256 i = 0; i <= aBytes.length - bBytes.length; i++) {
            bool same = true;
            for (uint256 j = 0; j < bBytes.length; j++) {
                if (aBytes[i + j] != bBytes[j]) {
                    same = false;
                    break;
                }
            }
            if (same) {
                return true;
            }
        }

        return false;
    }
}