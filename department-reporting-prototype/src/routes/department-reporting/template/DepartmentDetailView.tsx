import { 
  Breadcrumbs, 
  Button, 
  Card, 
  DataGrid, 
  PageHeader, 
  ProgressBar, 
  SidePane, 
  TextInput,
  Typography 
} from '@moneyforward/mfui-components';
import { type FC, useState } from 'react';
import { TextLink } from '../../../components/TextLink';
import styles from './department-detail.module.css';

interface Contract {
  id: string;
  name: string;
  cost: number;
  allocatedCost: number;
  allocationPercentage: number;
  startDate: string;
  endDate: string;
  sqft: number;
}

interface Location {
  id: string;
  name: string;
  cost: number;
  percentage: number;
  contracts: Contract[];
}

interface Department {
  name: string;
  totalCost: number;
  budgetVariance: number;
  locations: Location[];
}

interface Breadcrumb {
  label: string;
  path: string | null;
}

interface Props {
  department: Department;
  breadcrumbs: Breadcrumb[];
  selectedContract: string | null;
  onLocationDrillDown: (locationId: string) => void;
  onContractDetails: (contractId: string) => void;
  onBackToDashboard: () => void;
  onExportData: () => void;
  onContractClose: () => void;
}

/**
 * Department Detail View - Story 2.2 Implementation
 * Interactive drill-down navigation with breadcrumbs and SidePane for contract details
 */
export const DepartmentDetailView: FC<Props> = ({
  department,
  breadcrumbs,
  selectedContract,
  onLocationDrillDown,
  onContractDetails,
  onBackToDashboard,
  onExportData,
  onContractClose,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Find the selected contract details
  const contractDetails = department.locations
    .flatMap(loc => loc.contracts)
    .find(contract => contract.id === selectedContract);

  // Filter contracts based on search term
  const filteredLocations = department.locations.map(location => ({
    ...location,
    contracts: location.contracts.filter(contract =>
      contract.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.id.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  }));

  const locationColumns = [
    {
      key: 'name',
      label: 'Location',
      render: (row: Location) => (
        <TextLink onClick={() => onLocationDrillDown(row.id)}>
          {row.name}
        </TextLink>
      ),
    },
    {
      key: 'cost',
      label: 'Total Cost',
      render: (row: Location) => `$${row.cost.toLocaleString()}`,
    },
    {
      key: 'percentage',
      label: '% of Department',
      render: (row: Location) => `${row.percentage.toFixed(1)}%`,
    },
    {
      key: 'contracts',
      label: 'Contracts',
      render: (row: Location) => `${row.contracts.length} lease(s)`,
    },
  ];

  const contractColumns = [
    {
      key: 'name',
      label: 'Contract Name',
      render: (row: Contract) => (
        <TextLink onClick={() => onContractDetails(row.id)}>
          {row.name}
        </TextLink>
      ),
    },
    {
      key: 'allocatedCost',
      label: 'Allocated Cost',
      render: (row: Contract) => `$${row.allocatedCost.toLocaleString()}`,
    },
    {
      key: 'allocationPercentage',
      label: 'Allocation %',
      render: (row: Contract) => `${row.allocationPercentage.toFixed(1)}%`,
    },
    {
      key: 'sqft',
      label: 'Square Feet',
      render: (row: Contract) => `${row.sqft.toLocaleString()} sqft`,
    },
    {
      key: 'endDate',
      label: 'Expiry Date',
      render: (row: Contract) => new Date(row.endDate).toLocaleDateString(),
    },
  ];

  const getVarianceColor = (variance: number) => {
    if (variance > 5) return 'error';
    if (variance > 0) return 'warning';
    return 'success';
  };

  return (
    <div className={styles.departmentDetail}>
      {/* Breadcrumb Navigation */}
      <Breadcrumbs>
        {breadcrumbs.map((crumb, index) => (
          <Breadcrumbs.Item key={index}>
            {crumb.path ? (
              <TextLink onClick={onBackToDashboard}>{crumb.label}</TextLink>
            ) : (
              crumb.label
            )}
          </Breadcrumbs.Item>
        ))}
      </Breadcrumbs>

      <PageHeader
        title={`${department.name} Department Cost Analysis`}
        actions={[
          <Button key="export" variant="secondary" onClick={onExportData}>
            Export Department Data
          </Button>,
          <Button key="back" variant="outlined" onClick={onBackToDashboard}>
            Back to Dashboard
          </Button>,
        ]}
      />

      {/* Department Summary Cards */}
      <div className={styles.summaryCards}>
        <Card>
          <Card.Header>
            <Typography variant="contentHeading">Total Department Cost</Typography>
          </Card.Header>
          <Card.Body>
            <div className={styles.summaryValue}>
              <Typography variant="displayLarge" as="div">
                ${department.totalCost.toLocaleString()}
              </Typography>
            </div>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <Typography variant="contentHeading">Budget Variance</Typography>
          </Card.Header>
          <Card.Body>
            <div className={styles.summaryValue}>
              <Typography 
                variant="displayLarge" 
                as="div"
                className={styles[getVarianceColor(Math.abs(department.budgetVariance))]}
              >
                {department.budgetVariance >= 0 ? '+' : ''}{department.budgetVariance.toFixed(1)}%
              </Typography>
              <ProgressBar
                value={Math.abs(department.budgetVariance)}
                max={20}
                color={getVarianceColor(Math.abs(department.budgetVariance)) as any}
              />
            </div>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <Typography variant="contentHeading">Locations</Typography>
          </Card.Header>
          <Card.Body>
            <div className={styles.summaryValue}>
              <Typography variant="displayLarge" as="div">
                {department.locations.length}
              </Typography>
              <Typography variant="body">
                Active lease locations
              </Typography>
            </div>
          </Card.Body>
        </Card>
      </div>

      {/* Search Functionality */}
      <div className={styles.searchSection}>
        <TextInput
          label="Search contracts and locations"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by contract name or ID..."
        />
      </div>

      {/* Location Breakdown */}
      <div className={styles.locationsSection}>
        <Card>
          <Card.Header>
            <Typography variant="contentHeading">Cost Distribution by Location</Typography>
          </Card.Header>
          <Card.Body>
            <DataGrid
              data={filteredLocations}
              columns={locationColumns}
              pagination={{ pageSize: 10 }}
              sortable
              onRowClick={(row) => onLocationDrillDown(row.id)}
            />
          </Card.Body>
        </Card>
      </div>

      {/* Individual Lease Contracts */}
      <div className={styles.contractsSection}>
        <Card>
          <Card.Header>
            <Typography variant="contentHeading">Individual Lease Contracts</Typography>
          </Card.Header>
          <Card.Body>
            <DataGrid
              data={filteredLocations.flatMap(loc => loc.contracts)}
              columns={contractColumns}
              pagination={{ pageSize: 10 }}
              sortable
              onRowClick={(row) => onContractDetails(row.id)}
            />
          </Card.Body>
        </Card>
      </div>

      {/* Contract Details SidePane */}
      {contractDetails && (
        <SidePane
          title={`Contract Details: ${contractDetails.name}`}
          onClose={onContractClose}
          width="600px"
        >
          <div className={styles.contractDetails}>
            <div className={styles.detailSection}>
              <Typography variant="sectionHeading">Contract Information</Typography>
              <div className={styles.detailGrid}>
                <div className={styles.detailItem}>
                  <Typography variant="controlLabel">Contract ID</Typography>
                  <Typography>{contractDetails.id}</Typography>
                </div>
                <div className={styles.detailItem}>
                  <Typography variant="controlLabel">Total Contract Cost</Typography>
                  <Typography>${contractDetails.cost.toLocaleString()}</Typography>
                </div>
                <div className={styles.detailItem}>
                  <Typography variant="controlLabel">Allocated to {department.name}</Typography>
                  <Typography>${contractDetails.allocatedCost.toLocaleString()}</Typography>
                </div>
                <div className={styles.detailItem}>
                  <Typography variant="controlLabel">Allocation Percentage</Typography>
                  <Typography>{contractDetails.allocationPercentage.toFixed(1)}%</Typography>
                </div>
                <div className={styles.detailItem}>
                  <Typography variant="controlLabel">Square Footage</Typography>
                  <Typography>{contractDetails.sqft.toLocaleString()} sqft</Typography>
                </div>
                <div className={styles.detailItem}>
                  <Typography variant="controlLabel">Cost per Sqft</Typography>
                  <Typography>${(contractDetails.allocatedCost / contractDetails.sqft).toFixed(2)}</Typography>
                </div>
              </div>
            </div>

            <div className={styles.detailSection}>
              <Typography variant="sectionHeading">Lease Terms</Typography>
              <div className={styles.detailGrid}>
                <div className={styles.detailItem}>
                  <Typography variant="controlLabel">Start Date</Typography>
                  <Typography>{new Date(contractDetails.startDate).toLocaleDateString()}</Typography>
                </div>
                <div className={styles.detailItem}>
                  <Typography variant="controlLabel">End Date</Typography>
                  <Typography>{new Date(contractDetails.endDate).toLocaleDateString()}</Typography>
                </div>
                <div className={styles.detailItem}>
                  <Typography variant="controlLabel">Remaining Term</Typography>
                  <Typography>
                    {Math.ceil((new Date(contractDetails.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 365))} years
                  </Typography>
                </div>
              </div>
            </div>

            <div className={styles.detailSection}>
              <Typography variant="sectionHeading">Allocation Methodology</Typography>
              <div className={styles.allocationInfo}>
                <Typography variant="body">
                  This contract's cost is allocated to the {department.name} department based on 
                  space utilization and headcount ratios. The current allocation of {contractDetails.allocationPercentage.toFixed(1)}% 
                  reflects the department's proportional usage of the leased space.
                </Typography>
              </div>
            </div>
          </div>
        </SidePane>
      )}
    </div>
  );
};