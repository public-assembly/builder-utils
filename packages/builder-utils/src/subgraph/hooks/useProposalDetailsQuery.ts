import useSWR from 'swr'
import { fetcher } from '../fetcher'
import { PROPOSAL_DETAILS_QUERY } from '../queries/proposalDetails'
import { ProposalDetailsQuery, ProposalDetailsQueryVariables } from '../types/graphql'
import { useEnsNameOrShorten } from '../../hooks'
import { formatFromUnix } from '../../lib'

export function useProposalDetailsQuery({ proposalId }: { proposalId: string }) {
  const { data: proposalDetails, error } = useSWR<ProposalDetailsQuery>(
    `proposalDetails-${proposalId}`,
    () => fetcher(PROPOSAL_DETAILS_QUERY, { proposalId } as ProposalDetailsQueryVariables)
  )

  const proposer = useEnsNameOrShorten({ address: proposalDetails?.proposal?.proposer })

  return {
    forVotes: proposalDetails?.proposal?.forVotes,
    againstVotes: proposalDetails?.proposal?.againstVotes,
    abstainVotes: proposalDetails?.proposal?.abstainVotes,
    calldatas: proposalDetails?.proposal?.calldatas,
    description: proposalDetails?.proposal?.description,
    descriptionHash: proposalDetails?.proposal?.descriptionHash,
    executableFrom: formatFromUnix({
      timestamp: proposalDetails?.proposal?.executableFrom,
    }),
    expiresAt: formatFromUnix({ timestamp: proposalDetails?.proposal?.expiresAt }),
    proposalId: proposalDetails?.proposal?.proposalId,
    proposalNumber: proposalDetails?.proposal?.proposalNumber,
    proposalThreshold: proposalDetails?.proposal?.proposalThreshold,
    proposer: proposer,
    quorumVotes: proposalDetails?.proposal?.quorumVotes,
    targets: proposalDetails?.proposal?.targets,
    timeCreated: formatFromUnix({ timestamp: proposalDetails?.proposal?.timeCreated }),
    title: proposalDetails?.proposal?.title,
    values: proposalDetails?.proposal?.values,
    voteEnd: formatFromUnix({ timestamp: proposalDetails?.proposal?.voteEnd }),
    voteStart: formatFromUnix({ timestamp: proposalDetails?.proposal?.voteStart }),
    snapshotBlockNumber: proposalDetails?.proposal?.snapshotBlockNumber,
    transactionHash: proposalDetails?.proposal?.transactionHash,
    governorAddress: proposalDetails?.proposal?.dao.governorAddress,
    tokenAddress: proposalDetails?.proposal?.dao.tokenAddress,
    error,
  }
}
