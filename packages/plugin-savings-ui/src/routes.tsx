import queryString from 'query-string';
import React from 'react';
import { Route } from 'react-router-dom';
import asyncComponent from '@erxes/ui/src/components/AsyncComponent';
import Settings from './settings/containers/Settings';
import MainSettings from './settings/components/MainSettings';

const ContractList = asyncComponent(
  () =>
    import(
      /* webpackChunkName: "ContractList" */ './contracts/containers/List'
    ),
);

const ContractDetails = asyncComponent(
  () =>
    import(
      /* webpackChunkName: "ContractDetails" */ './contracts/containers/detail/ContractDetails'
    ),
);
const PeriodLockDetails = asyncComponent(
  () =>
    import(
      /* webpackChunkName: "PeriodLockDetails" */ './periodLocks/containers/PeriodLockDetails'
    ),
);

const TransactionList = asyncComponent(
  () =>
    import(
      /* webpackChunkName: "TransactionList" */ './transactions/containers/TransactionsList'
    ),
);
const PeriodLockList = asyncComponent(
  () =>
    import(
      /* webpackChunkName: "PeriodLockList" */ './periodLocks/containers/PeriodLocksList'
    ),
);

const ContractTypesList = asyncComponent(
  () =>
    import(
      /* webpackChunkName: "ContractTypesList" */ './contractTypes/containers/ContractTypesList'
    ),
);
const ContractTypeDetails = asyncComponent(
  () =>
    import(
      /* webpackChunkName: "ContractTypeDetails" */ './contractTypes/containers/ContractTypeDetails'
    ),
);

const contractLists = ({ location, history }) => {
  return (
    <ContractList
      queryParams={queryString.parse(location.search)}
      isDeposit={false}
      history={history}
    />
  );
};

const depositLists = ({ location, history }) => {
  return (
    <ContractList
      queryParams={queryString.parse(location.search)}
      isDeposit
      history={history}
    />
  );
};

const detailsOfContract = ({ match }) => {
  const id = match.params.id;

  return <ContractDetails id={id} />;
};

const periodLockDetail = ({ match }) => {
  const id = match.params.id;

  return <PeriodLockDetails id={id} />;
};

const transactionLists = ({ location, history }) => {
  return (
    <TransactionList
      queryParams={queryString.parse(location.search)}
      history={history}
    />
  );
};

const periodLockLists = ({ location, history }) => {
  return (
    <PeriodLockList
      queryParams={queryString.parse(location.search)}
      history={history}
    />
  );
};

const contractTypesLists = ({ location, history }) => {
  return (
    <ContractTypesList
      queryParams={queryString.parse(location.search)}
      history={history}
    />
  );
};

const contractTypeDetail = ({ match }) => {
  const id = match.params.id;

  return <ContractTypeDetails id={id} />;
};

const mainSettings = () => {
  return <Settings components={MainSettings}></Settings>;
};

const SavingRoutes = () => {
  return (
    <React.Fragment>
      <Route
        key="/erxes-plugin-saving/contract-list"
        path="/erxes-plugin-saving/contract-list"
        exact={true}
        component={contractLists}
      />
      <Route
        key="/erxes-plugin-saving/deposit-list"
        path="/erxes-plugin-saving/deposit-list"
        exact={true}
        component={depositLists}
      />
      <Route
        path="/erxes-plugin-saving/contract-details/:id"
        component={detailsOfContract}
      />
      <Route
        path="/erxes-plugin-saving/transaction-list"
        component={transactionLists}
      />
      <Route
        path="/erxes-plugin-saving/contract-types"
        component={contractTypesLists}
      />
      <Route
        path="/erxes-plugin-saving/contract-type-details/:id"
        component={contractTypeDetail}
      />

      <Route
        path="/erxes-plugin-saving/saving-settings"
        component={mainSettings}
      />
      <Route
        path="/erxes-plugin-saving/periodLock-list"
        component={periodLockLists}
      />
      <Route
        path="/erxes-plugin-saving/periodLock-details/:id"
        component={periodLockDetail}
      />
    </React.Fragment>
  );
};

export default SavingRoutes;
