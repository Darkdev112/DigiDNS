const ethers = require('ethers');
const provider = new ethers.JsonRpcProvider('https://sepolia.infura.io/v3/78004325985f4236b7a77d79bd77a9ac');   // infura sepolia endpoint
const wallet = new ethers.Wallet('c4ce1cc224b6016a3ebdb2451c739f5ace360df3f801a3c606e92b3ee65c76fb', provider); // wallet private key

const contractAddress = '0x4Be5E9ceEA7fab9cCD289F674B3611051C1361Ff';   // contract address
const contractABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "hostname",
				"type": "string"
			}
		],
		"name": "RecordAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "hostname",
				"type": "string"
			}
		],
		"name": "RecordDeleted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "hostname",
				"type": "string"
			}
		],
		"name": "RecordUpdated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "hostname",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "recordType",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "ttl",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "data",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "email",
				"type": "string"
			}
		],
		"name": "addRecord",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "hostname",
				"type": "string"
			}
		],
		"name": "deleteRecord",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllRecords",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "hostname",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "recordType",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "ttl",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "data",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "email",
						"type": "string"
					}
				],
				"internalType": "struct RecordManager.Record[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "hostname",
				"type": "string"
			}
		],
		"name": "getRecord",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "hostname",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "recordType",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "ttl",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "data",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "email",
						"type": "string"
					}
				],
				"internalType": "struct RecordManager.Record",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "partialHostname",
				"type": "string"
			}
		],
		"name": "searchRecord",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "hostname",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "recordType",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "ttl",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "data",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "email",
						"type": "string"
					}
				],
				"internalType": "struct RecordManager.Record[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "hostname",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "recordType",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "ttl",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "data",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "email",
				"type": "string"
			}
		],
		"name": "updateRecord",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];  // contract ABI

const contract = new ethers.Contract(contractAddress, contractABI, wallet);

async function addRecord(hostname, recordType, ttl, data, email) {
    const tx = await contract.addRecord(hostname, recordType, ttl, data, email);
    await tx.wait();
    console.log(`Record added: ${hostname}`);
}

async function deleteRecord(hostname) {
    const tx = await contract.deleteRecord(hostname);
    await tx.wait();
    console.log(`Record deleted: ${hostname}`);
}

async function updateRecord(hostname, recordType, ttl, data, email) {
    const tx = await contract.updateRecord(hostname, recordType, ttl, data, email);
    await tx.wait();
    console.log(`Record updated: ${hostname}`);
}

async function getRecord(hostname) {
    const record = await contract.getRecord(hostname);
    console.log(`Record fetched: `, record);
    return record;
}

async function getAllRecords() {
    const records = await contract.getAllRecords();
    console.log(`All records: `, records);
    return records;
}

async function searchRecord(partialHostname) {
    const records = await contract.searchRecord(partialHostname);
    console.log(`Search results: `, records);
    return records;
}

// Example usage
// (async () => {
//     await addRecord("example.com", "A", 3600, "192.168.1.1", "admin@example.com");
//     await getRecord("example.com");
//     await updateRecord("example.com", "A", 7200, "192.168.1.2", "support@example.com");
//     await getAllRecords();
//     await searchRecord("example");
//     await deleteRecord("example.com");
// })();