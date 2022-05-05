'use strict';
const BENEFICIARY_TABLE = 'beneficiaries';
const {database} = require('./database');

async function beneficiaryAdd(beneficiaryData) {
  const sql = `INSERT INTO ${BENEFICIARY_TABLE}
                 (memberId, firstName, lastName, birthDate,
                  streetAddress, city, zip, state, phoneNumber, ssn)
                 VALUES ($memberId, $firstName, $lastName,
                         $birthDate, $streetAddress, $city, $zip,
                         $state, $phoneNumber, $ssn)`;
  const params = {
    $memberId: beneficiaryData.memberId,
    $firstName: beneficiaryData.firstName,
    $lastName: beneficiaryData.lastName,
    $birthDate: beneficiaryData.birthDate,
    $streetAddress: beneficiaryData.streetAddress,
    $city: beneficiaryData.city,
    $zip: beneficiaryData.zip,
    $state: beneficiaryData.state,
    $phoneNumber: beneficiaryData.phoneNumber,
    $ssn: beneficiaryData.ssn,
  };
  await database.run(sql, params);
}

module.exports = {beneficiaryAdd};
