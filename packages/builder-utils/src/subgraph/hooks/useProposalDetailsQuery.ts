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
    proposalDetails: {
      forVotes: proposalDetails?.proposal?.forVotes,
      againstVotes: proposalDetails?.proposal?.againstVotes,
      abstainVotes: proposalDetails?.proposal?.abstainVotes,
      calldatas: proposalDetails?.proposal?.calldatas,
      canceled: proposalDetails?.proposal?.canceled,
      description: proposalDetails?.proposal?.description,
      descriptionHash: proposalDetails?.proposal?.descriptionHash,
      executableFrom: formatFromUnix({
        timestamp: proposalDetails?.proposal?.executableFrom,
      }),
      executableFromRaw: proposalDetails?.proposal?.executableFrom
        ? BigInt(proposalDetails?.proposal?.executableFrom)
        : '',
      executed: proposalDetails?.proposal?.executed,
      expiresAt: formatFromUnix({ timestamp: proposalDetails?.proposal?.expiresAt }),
      expiresAtRaw: proposalDetails?.proposal?.expiresAt
        ? BigInt(proposalDetails?.proposal?.expiresAt)
        : '',
      proposalId: proposalDetails?.proposal?.proposalId,
      proposalNumber: proposalDetails?.proposal?.proposalNumber,
      proposalThreshold: proposalDetails?.proposal?.proposalThreshold,
      proposer: proposer,
      queued: proposalDetails?.proposal?.queued,
      quorumVotes: proposalDetails?.proposal?.quorumVotes,
      targets: proposalDetails?.proposal?.targets,
      timeCreated: formatFromUnix({ timestamp: proposalDetails?.proposal?.timeCreated }),
      timeCreatedRaw: proposalDetails?.proposal?.timeCreated
        ? BigInt(proposalDetails?.proposal?.timeCreated)
        : '',
      title: proposalDetails?.proposal?.title,
      values: proposalDetails?.proposal?.values,
      voteEnd: formatFromUnix({ timestamp: proposalDetails?.proposal?.voteEnd }),
      voteEndRaw: proposalDetails?.proposal?.voteEnd
        ? BigInt(proposalDetails?.proposal?.voteEnd)
        : '',
      voteStart: formatFromUnix({ timestamp: proposalDetails?.proposal?.voteStart }),
      voteStartRaw: proposalDetails?.proposal?.voteStart
        ? BigInt(proposalDetails?.proposal?.voteStart)
        : '',
      vetoed: proposalDetails?.proposal?.vetoed,
      voteCount: proposalDetails?.proposal?.voteCount,
      snapshotBlockNumber: proposalDetails?.proposal?.snapshotBlockNumber,
      transactionHash: proposalDetails?.proposal?.transactionHash,
      governorAddress: proposalDetails?.proposal?.dao.governorAddress,
      tokenAddress: proposalDetails?.proposal?.dao.tokenAddress,
      votes: proposalDetails?.proposal?.votes,
    },
  }
}
