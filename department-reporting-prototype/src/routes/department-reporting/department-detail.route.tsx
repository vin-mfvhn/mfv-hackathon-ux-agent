import { type FC, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { DocumentTitle } from '../../components/DocumentTitle';
import { DepartmentDetailView } from './template/DepartmentDetailView';
import { Paths } from '../../routes';

/**
 * Mock data for Epic 2 Story 2.2 - Interactive Drill-Down Navigation
 */
const mockDepartmentData = {
  marketing: {
    name: 'Marketing',
    totalCost: 485000,
    budgetVariance: 12.5,
    locations: [
      {
        id: 'nyc-office',
        name: 'NYC Office - Floor 12',
        cost: 285000,
        percentage: 58.8,
        contracts: [
          {
            id: 'lease-001',
            name: 'Madison Ave Office Lease',
            cost: 180000,
            allocatedCost: 105840,
            allocationPercentage: 58.8,
            startDate: '2023-01-01',
            endDate: '2028-12-31',
            sqft: 2400,
          },
          {
            id: 'lease-002',
            name: 'Marketing Storage Unit',
            cost: 105000,
            allocatedCost: 61740,
            allocationPercentage: 58.8,
            startDate: '2023-06-01',
            endDate: '2026-05-31',
            sqft: 800,
          },
        ],
      },
      {
        id: 'sf-office',
        name: 'SF Office - Floor 8',
        cost: 200000,
        percentage: 41.2,
        contracts: [
          {
            id: 'lease-003',
            name: 'Market St Office Lease',
            cost: 200000,
            allocatedCost: 82400,
            allocationPercentage: 41.2,
            startDate: '2022-03-01',
            endDate: '2027-02-28',
            sqft: 1600,
          },
        ],
      },
    ],
  },
  engineering: {
    name: 'Engineering',
    totalCost: 420000,
    budgetVariance: -3.2,
    locations: [
      {
        id: 'nyc-office',
        name: 'NYC Office - Floors 10-11',
        cost: 320000,
        percentage: 76.2,
        contracts: [
          {
            id: 'lease-001',
            name: 'Madison Ave Office Lease',
            cost: 180000,
            allocatedCost: 137160,
            allocationPercentage: 76.2,
            startDate: '2023-01-01',
            endDate: '2028-12-31',
            sqft: 3800,
          },
        ],
      },
      {
        id: 'austin-office',
        name: 'Austin Tech Hub',
        cost: 100000,
        percentage: 23.8,
        contracts: [
          {
            id: 'lease-004',
            name: 'Austin Tech Center',
            cost: 100000,
            allocatedCost: 100000,
            allocationPercentage: 100,
            startDate: '2023-09-01',
            endDate: '2026-08-31',
            sqft: 2000,
          },
        ],
      },
    ],
  },
};

/**
 * Department Detail Route - Story 2.2 Implementation
 */
export const Component: FC = () => {
  const { departmentId } = useParams();
  const navigate = useNavigate();
  const [selectedContract, setSelectedContract] = useState<string | null>(null);

  // Get department data
  const departmentKey = departmentId as keyof typeof mockDepartmentData;
  const departmentData = mockDepartmentData[departmentKey];

  if (!departmentData) {
    return (
      <>
        <DocumentTitle title="Department Not Found" />
        <div>Department not found</div>
      </>
    );
  }

  const breadcrumbs = [
    { label: 'Executive Dashboard', path: Paths.Dashboard },
    { label: `${departmentData.name} Department`, path: null },
  ];

  const handleLocationDrillDown = (locationId: string) => {
    console.log('Drilling down to location:', locationId);
    // In a real app, this would navigate to location detail view
  };

  const handleContractDetails = (contractId: string) => {
    setSelectedContract(contractId);
    console.log('Showing contract details:', contractId);
  };

  const handleBackToDashboard = () => {
    navigate(Paths.Dashboard);
  };

  const handleExportDepartmentData = () => {
    console.log('Exporting department data for:', departmentData.name);
    alert(`Export department data for ${departmentData.name} - Story 2.5 implementation point`);
  };

  return (
    <>
      <DocumentTitle title={`${departmentData.name} Department Details`} />

      <DepartmentDetailView
        department={departmentData}
        breadcrumbs={breadcrumbs}
        selectedContract={selectedContract}
        onLocationDrillDown={handleLocationDrillDown}
        onContractDetails={handleContractDetails}
        onBackToDashboard={handleBackToDashboard}
        onExportData={handleExportDepartmentData}
        onContractClose={() => setSelectedContract(null)}
      />
    </>
  );
};